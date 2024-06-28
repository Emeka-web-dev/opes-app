import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { User } from "@prisma/client";

const maxReferralsPerGeneration = 2;

export async function calculateReferralRewards(
  user: User,
  amount: number
): Promise<void> {
  let currentGeneration = 1;
  let referrerId = user.referredById;

  while (referrerId && currentGeneration <= 3) {
    const referrer = await db.user.findUnique({
      where: { id: referrerId },
      include: {
        payment: true,
      },
    });
    if (!referrer || !referrer.payment) {
      console.log("Refer user not paid", referrer);
      break;
    }

    const referralCount = await db.referral.count({
      where: {
        referrerId: referrer.id,
        referred: {
          payment: {
            isNot: null,
          },
        },
      },
    });

    if (referralCount > maxReferralsPerGeneration) {
      console.log("Reach limit");
      break;
    }

    let rewardPercentage = 0;
    switch (currentGeneration) {
      case 1:
        rewardPercentage = 50;
        break;
      case 2:
        rewardPercentage = 25;
        break;
      case 3:
        rewardPercentage = 12.5;
        break;
    }

    const reward = (amount * rewardPercentage) / 100;

    const referrerGen = await db.user.update({
      where: { id: referrer.id },
      data: {
        earnings: referrer.earnings + reward,
      },
      include: {
        referrals: true,
      },
    });

    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    await db.earningHistory.create({
      data: {
        payerId: user.id,
        receiverId: referrerGen.id,
        amount: reward,
        month,
        year,
      },
    });

    pusherServer.trigger("getUserData", `user:${referrerGen?.id}`, referrerGen);

    referrerId = referrer.referredById;
    currentGeneration++;
  }
}
