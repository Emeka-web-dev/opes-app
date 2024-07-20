import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { PaymentPlan, User } from "@prisma/client";

const MAXREFERRALSPERGENERATION = 5;
const compensationPercentages = {
  BASIC: [50, 25, 12.5],
  POPULAR: [40, 20, 10, 5],
  GOLDEN: [30, 20, 10, 5, 2.5],
};

export async function calculateReferralRewards(
  user: User,
  amount: number,
  paymentPlan: PaymentPlan
): Promise<void> {
  const percentages = compensationPercentages[paymentPlan];
  const maxGenerations = percentages.length;
  let currentGeneration = 1;
  let referrerId = user.referredById;

  const updates = [];

  while (referrerId && currentGeneration <= maxGenerations) {
    const referrer = await db.user.findUnique({
      where: { id: referrerId },
      include: {
        payment: true,
      },
    });

    if (!referrer || !referrer.payment) break;

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

    const referralCountLimit = referralCount > MAXREFERRALSPERGENERATION;
    const rewardPercentage = referralCountLimit
      ? 50
      : percentages[currentGeneration - 1];

    // calculate reward
    const reward = (amount * rewardPercentage) / 100;

    // total number of referral
    const referralCountNumber =
      referrer.referralCount + (!referralCountLimit ? 1 : 0);

    updates.push({
      id: referrer.id,
      data: {
        earnings: referrer.earnings + reward,
        referralCount: referralCountNumber,
        isWithdrawable: referralCount >= MAXREFERRALSPERGENERATION,
      },
      earningHistory: reward,
    });

    if (referralCountLimit) break;

    referrerId = referrer.referredById;
    currentGeneration++;
  }

  const currentDate = new Date().toISOString();

  await Promise.all(
    updates.map(({ id, data, earningHistory }) => {
      db.$transaction([
        db.user.update({
          where: { id },
          data,
        }),
        db.earningHistory.create({
          data: {
            amount: earningHistory,
            payerId: user.id,
            receiverId: id,
          },
        }),
      ]);
      pusherServer.trigger("getUserData", `user:${id}`, {
        user: data,
        earnings: [{ amount: earningHistory, createdAt: currentDate }],
      });
    })
  );
}
