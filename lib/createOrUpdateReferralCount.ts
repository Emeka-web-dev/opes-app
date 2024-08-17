import { db } from "./db";

export async function createOrUpdateReferralCount(
  userId: string,
  generation: number
): Promise<number> {
  const existingReferralCount = await db.referralCount.findUnique({
    where: {
      userId_generation: {
        userId,
        generation,
      },
    },
  });

  if (existingReferralCount) {
    // Update the existing count
    const updatedReferralCount = await db.referralCount.update({
      where: {
        userId_generation: {
          userId,
          generation,
        },
      },
      data: {
        count: existingReferralCount.count + 1,
      },
    });

    return updatedReferralCount.count;
  } else {
    // Create a new referral count entry
    const newReferralCount = await db.referralCount.create({
      data: {
        userId,
        generation,
        count: 1,
      },
    });

    return newReferralCount.count;
  }
}
