import { UserWithReferral } from "@/app/api/getUserReferrals/route";

export function fillEmptySpots(
  user: UserWithReferral,
  maxReferrals: number = 5,
  generations: number = 3
): UserWithReferral {
  const userTree: UserWithReferral = {
    ...user,
    children: user.children.map((child) => ({ ...child })),
  };

  if (generations <= 0) return userTree;

  const filledReferrals = [...userTree.children];

  while (filledReferrals.length < maxReferrals) {
    filledReferrals.push({
      email: "empty",
      index: 0,
      name: "empty",
      children: [],
    });
  }

  userTree.children = filledReferrals.map((referral) =>
    fillEmptySpots(referral, maxReferrals, generations - 1)
  );

  //   console.log(userTree);

  return userTree;
}
