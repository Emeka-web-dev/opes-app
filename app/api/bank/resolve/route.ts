import { currentUser } from "@/lib/auth";
import { BankData } from "@/typings";
import axios from "axios";
import { NextResponse } from "next/server";
import qs from "query-string";

export async function GET(req: Request) {
  try {
    const user = await currentUser();
    const { searchParams } = new URL(req.url);

    const accountNumber = searchParams.get("account_number");
    const bankCode = searchParams.get("bank_code");

    if (!user || !user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const apiRoute = "https://api.paystack.co/bank/resolve";

    const url = qs.stringifyUrl({
      url: apiRoute,
      query: {
        account_number: accountNumber,
        bank_code: bankCode,
      },
    });

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY!}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("INTERNAL_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
