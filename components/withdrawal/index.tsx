import { useCurrencyFormatter } from "@/hooks/use-currency-formatter";
import { WithdrawalData } from "@/typings";
import { Landmark, Pencil } from "lucide-react";
import Link from "next/link";
import { WithdrawalForm } from "./withdrawalForm";

export type WithdrawProps = {
  data: WithdrawalData;
};
export const Withdraw = ({ data }: WithdrawProps) => {
  const balance = useCurrencyFormatter(data.earnings);
  const withdrawableBalance = useCurrencyFormatter(data.withdrawableEarnings);
  return (
    <div className="max-w-2xl mx-auto bg-white">
      <h2 className="font-semibold text-lg p-4 border-b">Withdraw</h2>
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex flex-col space-y-1">
          <h4 className="font-semibold text-sm">Total Balance</h4>
          <h5 className="font-semibold text-xs text-green-500">
            Withdrawable Balance
          </h5>
        </div>
        <div>
          <h4 className="font-semibold text-sm">{balance}</h4>
          <h5 className="font-semibold text-xs text-green-500">
            {withdrawableBalance}
          </h5>
        </div>
      </div>
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex flex-col">
          <h5 className="font-semibold text-xs text-[#4b2e9b]">Bank Details</h5>
          <h4 className="font-semibold tex-sm">
            {data.bankDetails.accountName}
          </h4>
          <div className="font-semibold text-xs flex space-x-2">
            <span>{data.bankDetails.accountNumber}</span>
            <Landmark className="size-4" />
            <span>{data.bankDetails.bankName}</span>
          </div>
        </div>
        <Link href="/settings/bank">
          <Pencil className="size-5 text-[#4b2e9b] mr-2" />
        </Link>
      </div>
      <WithdrawalForm amount={data.withdrawableEarnings} />
    </div>
  );
};
