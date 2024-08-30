"use server";

import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { BankDetailSchema } from "@/schemas";
import * as z from "zod";

export const createOrUpdateBankDetails = async (
  data: z.infer<typeof BankDetailSchema>,
  name: string,
  id: string,
  opt: string,
  email: string
) => {
  const validatedFields = BankDetailSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid field!" };
  }

  const { bankName: bank, bankNumber } = validatedFields.data;
  const accountName = name;
  const accountNumber = bankNumber.toString();
  const bankCode = bank?.code.toString()!;
  const bankName = bank?.name!;

  try {
    const twoFactorToken = await getTwoFactorTokenByEmail(email);

    if (!twoFactorToken) {
      return { error: "Invalid code!" };
    }

    if (twoFactorToken.token !== opt) {
      return { error: "Invalid code!" };
    }

    const hasExpired = new Date(twoFactorToken.expires) < new Date();

    if (hasExpired) {
      return { error: "Code expired!" };
    }

    await db.twoFactorToken.delete({
      where: { id: twoFactorToken.id },
    });

    await db.bankDetails.upsert({
      where: { userId: id },
      update: {
        accountName,
        accountNumber,
        bankCode,
        bankName,
      },
      create: {
        userId: id,
        accountName,
        accountNumber,
        bankCode,
        bankName,
      },
    });
    return { success: "Updated Successfully!" };
  } catch (error) {
    return { error: "Failed to Update!" };
  }
};
