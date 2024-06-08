type BalanceProps = {
  earning: number | undefined;
};
export const Balance = ({ earning }: BalanceProps) => {
  return <div>Balance: {earning}</div>;
};
