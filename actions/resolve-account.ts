"use server";

import { BankDetailSchema } from "@/schemas";
import * as z from "zod";
import qs from "query-string";
import axios from "axios";

export const resolveAccount = async (
  values: z.infer<typeof BankDetailSchema>
) => {
  const validatedFields = BankDetailSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid field!" };
  }

  const { bankName, bankNumber } = validatedFields.data;

  const apiRoute = "https://api.paystack.co/bank/resolve";

  const url = qs.stringifyUrl({
    url: apiRoute,
    query: {
      account_number: bankNumber,
      bank_code: bankName?.code,
    },
  });

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY!}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data.status) {
      return { data: response.data.data };
    }
    return { error: "Check account number!" };
  } catch (error) {
    return { error: "Check a different account!" };
  }
};
