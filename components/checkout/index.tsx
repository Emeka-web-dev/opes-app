import { logout } from "@/actions/logout";
import axios from "axios";
import { useState } from "react";
import { NavigationItems } from "../navigation";
import { Button } from "../ui/button";
import { redirect, useSearchParams } from "next/navigation";
import { PaymentPlan } from "@prisma/client";

type CheckoutProps = {
  user: any;
};
export function Checkout({ user }: CheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const plan = searchParams?.get("plan");

  const signOut = async () => {
    await logout();
    window.location.reload();
  };
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

  const isPaymentPlan = (value: any) => {
    return Object.values(PaymentPlan).includes(value);
  };

  if (!user?.paymentPlan && !isPaymentPlan(plan)) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col pt-[3.5rem]">
      <NavigationItems user={user} />
      <Button onClick={onClick} className="w-fit" disabled={isLoading}>
        Payment
      </Button>
    </div>
  );
}
