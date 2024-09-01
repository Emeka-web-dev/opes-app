"use server";

import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { sendTwoFactorTokenEmail } from "@/lib/mail";
import { generateTwoFactorToken } from "@/lib/token";
import { BankDetailSchema } from "@/schemas";
import * as z from "zod";

export const sendOpt = async (email: string) => {
  try {
    const existingToken = await getTwoFactorTokenByEmail(email);

    const hasExpired = new Date(existingToken?.expires as Date) < new Date();

    if (existingToken && !hasExpired) {
      return { success: "Wait a few minute to retry!" };
    }
    const opt = await generateTwoFactorToken(email);
    await sendTwoFactorTokenEmail(opt.email, opt.token);
    return { success: "Updated Successfully!" };
  } catch (error) {
    return { error: "Failed to Update!" };
  }
};
