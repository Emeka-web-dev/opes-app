import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Tier } from "@prisma/client";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const user = await currentUser();

    if (!user || !user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const purchase = await db.purchase.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (purchase) {
      return new NextResponse("Already Subscribed", { status: 400 });
    }

    const apiRoute = "https://api.paystack.co/transaction/initialize";

    const params = {
      email: user?.email,
      amount: 2000 * 100,
      metadata: {
        userId: user?.id,
        tier: Tier.BASIC,
        cancel_action: `${process.env.NEXT_PUBLIC_BASE_URL!}/${
          purchase ? "success" : "checkout"
        }`,
      },
    };

    const response = await axios.post(apiRoute, params, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY!}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.log("INTERNAL_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
