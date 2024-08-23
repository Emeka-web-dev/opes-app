import { useCurrencyFormatter } from "@/hooks/use-currency-formatter";

type BalanceProps = {
  earning: number | undefined;
  withdrawableEarning: number | undefined;
};
export const Balance = ({ earning, withdrawableEarning }: BalanceProps) => {
  const balance = useCurrencyFormatter(earning);
  const withdrawableBalance = useCurrencyFormatter(withdrawableEarning);

  return (
    <div className="p-4 bg-[#9772fc] dark:bg-background rounded-lg text-gray-100  h-full shadow-lg flex justify-between px-8">
      <div className="flex flex-col space-y-1">
        <h3 className="">Total Balance</h3>
        <h2 className="text-2xl font-semibold">{balance}</h2>
      </div>
      <div className="flex flex-col space-y-1">
        <h3>Withdrawable Balance</h3>
        <h2 className="text-2xl font-semibold">{withdrawableBalance}</h2>
      </div>
    </div>
  );
};
