import { db } from "./db";

export async function createOrUpdateReferralCount(
  userId: string,
  generation: number
): Promise<number> {
  const data = await db.referralCount.upsert({
    where: {
      userId_generation: {
        userId,
        generation,
      },
    },
    update: {
      count: {
        increment: 1,
      },
    },
    create: {
      userId,
      generation,
      count: 1,
    },
  });

  return data.count;
}
