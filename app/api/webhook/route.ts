// import { headers } from "next/headers";
// import crypto from "crypto";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { Logging, createLogging } from "@/lib/logging";
// import { date } from "zod";
// import { generateRefToken } from "@/lib/ref-token";
// import { calculateReferralRewards } from "@/hooks/referral";
// import { getUserById } from "@/data/user";
// import { revalidatePath } from "next/cache";

// export async function POST(req: Request) {
//   const body = await req.json();
//   const signature = headers().get("x-paystack-signature") as string;
//   const hash = crypto
//     .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
//     .update(JSON.stringify(body))
//     .digest("hex");

//   if (signature !== hash) {
//     return new NextResponse("Not authorized!", { status: 400 });
//   }

//   const userId = body.data.metadata.userId;
//   const paymentPlan = body.data.metadata.tier;

//   const user = await getUserById(userId);
//   if (!user) {
//     return new NextResponse("User not found!", { status: 400 });
//   }

//   // if payment is successful
//   if (body.event === "charge.success") {
//     if (!userId || !paymentPlan) {
//       return new NextResponse(`Webhook Error: Missing metadata`, {
//         status: 400,
//       });
//     }
//     const amount = body?.data?.amount / 100;

//     //create payment
//     await db.payment.create({
//       data: {
//         userId,
//         method: body?.data?.channel,
//         amount,
//         reference: body?.data?.reference,
//       },
//     });

//     //update user profile
//     await db.user.update({
//       where: {
//         id: userId,
//       },
//       data: {
//         paymentPlan,
//         invitationCode: generateRefToken(6),
//       },
//     });

//     //if user is referred
//     if (user?.referredById) {
//       await calculateReferralRewards(user, amount);
//     }

//     console.log("Earnings distributed");
//   } else {
//     const logging: Logging = {
//       event: body.event,
//       reference: body?.data?.reference,
//       message: body?.data?.message,
//       createdAt: new Date(),
//     };
//     await createLogging(logging);
//     return new NextResponse(
//       `Webhook Error: Unhandled event type ${body.event}`,
//       { status: 200 }
//     );
//   }

//   return new NextResponse(null, { status: 200 });
// }
