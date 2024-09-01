import { collectAndSortByIndex } from "@/hooks/collect-and-sort-by-index";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export interface UserWithReferral {
  invitationCode?: string | null;
  // email: string | null;
  index: number;
  name: string | null;
  children: UserWithReferral[];
}

export async function GET(req: Request) {
  async function getReferrals(
    userId: string,
    currentIndex: { value: number }
  ): Promise<UserWithReferral> {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        referrals: {
          where: {
            referred: {
              payment: {
                isNot: null,
              },
            },
          },
          take: 5,
        },
      },
    });

    if (!user) {
      throw new Error("User width id &{userId} not found");
    }

    const userIndex = currentIndex.value++;
    const referrals: UserWithReferral[] = await Promise.all(
      user.referrals.map(async (referral) => {
        const referralWithReferrals = await getReferrals(
          referral.referredId,
          currentIndex
        );
        return referralWithReferrals;
      })
    );

    return {
      // email: user.email,
      name: user.name,
      invitationCode: user.invitationCode,
      index: userIndex,
      children: referrals,
    };
  }

  try {
    const profile = await currentUser();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const currentIndex = { value: 1 };
    const getReferral = await getReferrals(profile?.id!, currentIndex);

    return NextResponse.json(getReferral);
  } catch (error) {
    console.log("[CURRENT_USER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
