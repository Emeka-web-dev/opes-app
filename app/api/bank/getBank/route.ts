import { currentUser } from "@/lib/auth";
import { BankData } from "@/typings";
import axios from "axios";
import { NextResponse } from "next/server";
import qs from "query-string";

export async function GET(req: Request) {
  try {
    const user = await currentUser();

    if (!user || !user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const apiRoute = "https://api.paystack.co/bank";

    const url = qs.stringifyUrl({
      url: apiRoute,
      query: {
        country: "nigeria",
        currency: "NGN",
        type: "nuban",
      },
    });

    const bankData: BankData[] = [];
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY!}`,
        "Content-Type": "application/json",
      },
    });

    response.data.data.map((data: any) => {
      bankData.push({
        name: data.name,
        code: Number(data.code),
      });
    });

    return NextResponse.json(bankData);
  } catch (error) {
    console.log("INTERNAL_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
