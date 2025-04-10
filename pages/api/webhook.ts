import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { generateRefToken } from "@/lib/ref-token";
import { calculateReferralRewards } from "@/hooks/referral";
import { Logging, createLogging } from "@/lib/logging";
import { PaymentPlan } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body;
    const signature = req.headers["x-paystack-signature"] as string;
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(JSON.stringify(body))
      .digest("hex");

    if (signature !== hash) {
      return res.status(400).json("Not authorized");
    }

    switch (body.event) {
      case "charge.success":
        const userId = body.data.metadata.userId;
        const paymentPlan: PaymentPlan = body.data.metadata.tier;

        const user = await getUserById(userId);
        if (!user) {
          return res.status(400).json("User not found!");
        }
        if (!userId || !paymentPlan) {
          return res.status(400).json("Webhook Error: Missing metadata");
        }
        const amount = body?.data?.amount / 100;

        //create payment
        await db.payment.create({
          data: {
            userId,
            method: body?.data?.channel,
            amount,
            reference: body?.data?.reference,
          },
        });

        //update user profile
        await db.user.update({
          where: {
            id: userId,
          },
          data: {
            paymentPlan,
            invitationCode: await generateRefToken(6),
          },
        });

        //if user is referred
        if (user?.referredById) {
          await calculateReferralRewards(user, amount, paymentPlan);
        }
        break;
      case "transfer.success":
        console.log("Transfer failed:", body.data);
        break;
      case "transfer.failed":
        console.log("Transfer was reversed:", body.data);
        break;
      case "transfer.reversed":
        console.log("Transfer was reversed:", body.data);
        break;
      default:
        const logging: Logging = {
          event: body.event,
          reference: body?.data?.reference,
          message: body?.data?.message,
          createdAt: new Date(),
        };
        await createLogging(logging);
        return res
          .status(200)
          .json(`Webhook Error: Unhandled event type ${body.event}`);
    }

    return res.status(200);
  } catch (error) {
    console.log("Error processing webhook:", error);
    return res.status(500).json("Error processing webhook");
  }
}
