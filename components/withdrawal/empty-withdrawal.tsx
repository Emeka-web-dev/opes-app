import { BellOff } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export const EmptyWithdrawal = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white h-[100%] pb-[3.5rem] flex flex-col items-center justify-center text-center space-y-4">
      <BellOff className="size-20 text-primary" />
      <p className="text-sm px-2">
        You have not added your bank account details. Please update your bank
        account details before placing withdrawals of your funds
      </p>
      <Button asChild>
        <Link href="/settings/bank">Update bank details</Link>
      </Button>
    </div>
  );
};
