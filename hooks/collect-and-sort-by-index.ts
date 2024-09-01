import { UserWithReferral } from "@/app/api/getUserReferrals/route";

export interface UserWithoutReferrals {
  name: string;
  // email: string;
  index: number;
  invitationCode: string;
}

export const collectAndSortByIndex = (
  user: UserWithReferral
): UserWithoutReferrals[] => {
  const result: UserWithoutReferrals[] = [];

  function transverse(user: UserWithReferral) {
    result.push({
      name: user.name!,
      index: user.index,
      invitationCode: user.invitationCode!,
    });

    for (const referral of user.children) {
      transverse(referral);
    }
  }

  transverse(user);

  result.sort((a, b) => a.index - b.index);

  return result;
};
