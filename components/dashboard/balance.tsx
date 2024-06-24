import { useCurrencyFormatter } from "@/hooks/use-currency-formatter";

type BalanceProps = {
  earning: number | undefined;
};
export const Balance = ({ earning }: BalanceProps) => {
  const balance = useCurrencyFormatter(earning);

  return (
    <div className="p-4 bg-[#9772fc] dark:bg-background rounded-lg text-gray-100 flex flex-col space-y-1 h-full shadow-lg">
      <h3 className="">Total Balance</h3>
      <h2 className="text-2xl font-semibold">{balance}</h2>
    </div>
  );
};
