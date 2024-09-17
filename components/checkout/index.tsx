"use client";

import { PaymentPlan } from "@prisma/client";
import axios from "axios";
import { Check, Loader, Loader2 } from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LayoutProvider } from "../providers/layout-provider";
import { Button } from "../ui/button";
import Image from "next/image";

type CheckoutProps = {
  user: any;
};

const paymentPlan = {
  [PaymentPlan.BASIC]: {
    name: "Basic Plan",
    amount: "2,000",
    points: ["Earn from 3 levels of refferal", "+₦5,000 completion bonus"],
  },
  [PaymentPlan.POPULAR]: {
    name: "Starter Plan",
    amount: "5,000",
    points: ["Earn from 4 levels of refferal", "+₦10,000 completion bonus"],
  },
  [PaymentPlan.GOLDEN]: {
    name: "Advanced Plan",
    amount: "10,000",
    points: ["Earn from 5 levels of refferal", "+₦50,000 completion bonus"],
  },
};
export function Checkout({ user }: CheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const plan = searchParams?.get("plan");

  const isPaymentPlan = (value: any) =>
    Object.values(PaymentPlan).includes(value);

  if (!user?.paymentPlan && !isPaymentPlan(plan)) {
    return redirect("/");
  }
  const data =
    paymentPlan[(plan as PaymentPlan) || (user?.paymentPlan as PaymentPlan)];

  const onClick = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/checkout", JSON.stringify(plan));
      window.location.assign(data.data.authorization_url);
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LayoutProvider>
      <div className="max-w-6xl mx-auto px-2 flex flex-col items-center gap-y-4 py-4 justify-center h-full">
        <div className="border border-gray-400 px-8 py-6 max-w-96 mx-auto w-full rounded-2xl flex flex-col relative overflow-hidden bg-inherit">
          <div className="absolute w-[350px] h-[350px] rounded-full -top-56 -left-14 bg-[#f4fafe] dark:bg-[#919bb1] -z-10" />
          <div className="absolute w-[250px] h-[250px] rounded-full -top-40 -right-14 bg-[#e62e2d]/5  dark:bg-[#cec3d8]/20 -z-10" />
          <div className="flex flex-col ">
            <h4 className="text-2xl p-0 m-0">{data.name}</h4>
            <h3 className="text-3xl font-semibold">₦{data.amount}</h3>
          </div>
          <div className="mt-9">
            {data.points.map((point, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {point}
                </p>
              </div>
            ))}
          </div>
          <Button onClick={onClick} disabled={isLoading} className="mt-4">
            {isLoading && <Loader2 className="size-4 mr-2 animate-spin" />}
            {isLoading ? "Checking" : "Checkout"}
          </Button>
        </div>
        <Image
          src="/images/payment-card-logo.jpg"
          height={100}
          width={200}
          alt="payment card"
        />
      </div>
    </LayoutProvider>
  );
}
