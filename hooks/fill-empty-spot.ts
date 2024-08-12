import { UserWithReferral } from "@/app/api/getUserReferrals/route";

export function fillEmptySpots(
  user: UserWithReferral,
  maxReferrals: number = 5,
  generations: number = 3
): UserWithReferral {
  if (generations <= 0) return user;

  const filledReferrals = [...user.children];

  while (filledReferrals.length < maxReferrals) {
    filledReferrals.push({
      email: "empty",
      index: 0,
      children: [],
    });
  }

  user.children = filledReferrals.map((referral) =>
    fillEmptySpots(referral, maxReferrals, generations - 1)
  );

  return user;
}
