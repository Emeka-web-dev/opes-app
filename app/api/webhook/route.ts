import { headers } from "next/headers";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Logging, createLogging } from "@/lib/logging";
import { date } from "zod";
import { generateRefToken } from "@/lib/ref-token";

export async function POST(req: Request) {
  const body = await req.json();
  const signature = headers().get("x-paystack-signature") as string;
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(JSON.stringify(body))
    .digest("hex");

  if (signature !== hash) {
    return new NextResponse("Not authorized!", { status: 400 });
  }

  const userId = body.data.metadata.userId;
  const paymentPlan = body.data.metadata.tier;

  if (body.event === "charge.success") {
    if (!userId || !paymentPlan) {
      return new NextResponse(`Webhook Error: Missing metadata`, {
        status: 400,
      });
    }
    console.log({ body });
    await db.payment.create({
      data: {
        userId,
        method: body?.data?.channel,
        amount: body?.data?.amount / 100,
        reference: body?.data?.reference,
      },
    });

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        paymentPlan,
        invitationCode: generateRefToken(6),
      },
    });
  } else {
    const logging: Logging = {
      event: body.event,
      reference: body?.data?.reference,
      message: body?.data?.message,
      createdAt: new Date(),
    };
    await createLogging(logging);
    return new NextResponse(
      `Webhook Error: Unhandled event type ${body.event}`,
      { status: 200 }
    );
  }
  //   console.log({
  //     signature,
  //     hash,
  //     bod: {
  //       metadata: body.data.metadata,
  //       authorization: body.data.authorization,
  //       customer: body.data.customer,
  //       source: body.data.source,
  //     },
  //   });
  //   if (hash === signature) {
  //     console.log("EVENT", event);
  //   }
  //   console.log(headers().get("x-paystack-signature"));
  //   const body = await req.json();
  return new NextResponse(null, { status: 200 });
}
