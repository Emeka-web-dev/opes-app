import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const profile = await currentUser();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await db.user.findUnique({
      where: {
        id: profile.id,
      },
      include: {
        referrals: {
          include: {
            referred: true,
          },
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[CURRENT_USER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
