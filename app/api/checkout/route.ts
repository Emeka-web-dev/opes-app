import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { PaymentPlan } from "@prisma/client";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = (await req.json()) as PaymentPlan | undefined;

  const paymentPlans: Record<PaymentPlan, number> = {
    BASIC: 2000,
    POPULAR: 5000,
    GOLDEN: 10000,
  };

  try {
    const user = await currentUser();

    const parentUser = await getUserById(user?.referrerId || "");
    const plan = parentUser?.paymentPlan;

    if (!user || !user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const purchase = await db.payment.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (purchase) {
      return new NextResponse("Already Subscribed", { status: 400 });
    }

    const apiRoute = "https://api.paystack.co/transaction/initialize";

    const selectedPlan: PaymentPlan = plan || body || "BASIC";

    const params = {
      email: user?.email,
      amount: paymentPlans[selectedPlan] * 100,
      metadata: {
        userId: user?.id,
        tier: selectedPlan,
        cancel_action: `${process.env.NEXT_PUBLIC_SITE_URL!}/checkout`,
      },
    };

    const response = await axios.post(apiRoute, params, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY!}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("INTERNAL_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
