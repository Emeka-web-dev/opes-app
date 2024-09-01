"use server";

import axios from "axios";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";

export const userWithdraw = async (
  password: string,
  amount: string,
  id: string
) => {
  const existingUser = await getUserById(id);

  if (!existingUser) {
    return { error: "User not found!" };
  }

  const bankDetails = await db.bankDetails.findUnique({
    where: { userId: id },
  });

  if (!bankDetails) {
    return { error: "Bank details does not exist!" };
  }

  try {
    // const options = {
    //   source: "balance",
    //   amount: Number(amount) * 100,
    //   recipient: bankDetails.recipientCode,
    //   reason: "Calm down",
    // };
    // const response = await axios.post(
    //   "https://api.paystack.co/transfer",
    //   options,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY!}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // // if (!response.data.status) {
    // //   return {error: "data"}
    // // }
    // console.log(response.data);

    return { success: "Successful!" };
  } catch (error) {
    console.log("USER WITHDRAW", error);
    return { error: "Something went wrong" };
  }
};
