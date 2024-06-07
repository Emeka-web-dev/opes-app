"use server";

import { getUserByEmail, getUserByRefToken } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { SignupSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  const validatedFields = SignupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid field!" };
  }

  const { name, email, password, referralLink } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  let referrer;
  if (referralLink) {
    referrer = await getUserByRefToken(referralLink);
  }

  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      referredById: referrer?.id || null,
      paymentPlan: referrer?.paymentPlan,
    },
  });

  if (referrer) {
    await db.referral.create({
      data: {
        referrerId: referrer.id,
        referredId: newUser.id,
        generation:
          (await db.referral.count({
            where: { referredId: referrer.id },
          })) > 0
            ? 2
            : 1,
      },
    });
  }

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Verification email sent!" };
};
