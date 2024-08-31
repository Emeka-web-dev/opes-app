"use server";

import axios from "axios";
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

    const bankDetails = await db.bankDetails.findUnique({
      where: {
        userId: id,
      },
    });

    let recipientCode = bankDetails?.recipientCode as string;

    if (!recipientCode) {
      // Create a new recipient with Paystack if recipient code does not exist
      const options = {
        type: "nuban",
        name: accountName,
        account_number: accountNumber,
        bank_code: bankCode,
        currency: "NGN",
      };
      const response = await axios.post(
        "https://api.paystack.co/transferrecipient",
        options,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY!}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status !== true) {
        throw new Error(response.data.message);
      }
      recipientCode = response.data.data.recipient_code;

      await db.bankDetails.create({
        data: {
          userId: id,
          recipientCode,
          bankName: response.data.data.details.bank_name!,
          accountNumber,
          accountName,
          bankCode,
        },
      });
    } else {
      // Update the recipient with Paystack if recipient code exists
      const response = await axios.put(
        `https://api.paystack.co/transferrecipient/${recipientCode}`,
        {
          name: name,
          account_number: accountNumber,
          bank_code: bankCode,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY!}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status !== true) {
        throw new Error(response.data.message);
      }

      // Update the user record in the database
      await db.bankDetails.update({
        where: { userId: id },
        data: {
          bankName,
          accountNumber,
          accountName,
          bankCode,
        },
      });
    }

    return { success: "Updated Successfully!" };
  } catch (error) {
    console.log("CREATE OR UPDATE BANK DETAIL", error);
    return { error: "Failed to Update!" };
  }
};
