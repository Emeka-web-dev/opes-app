"use server";

import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";

export const inviteUser = async (value: z.infer<typeof ResetSchema>) => {
  const validatedField = ResetSchema.safeParse(value);

  if (!validatedField.success) {
    return { error: "Invalid email" };
  }

  const { email } = validatedField.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User Aready a member!" };
  }

  // const passwordResetToken = await generatePasswordResetToken(email);
  // await sendPasswordResetEmail(
  //   passwordResetToken.email,
  //   passwordResetToken.token
  // );

  // return { success: "Email Sent!" };
};
