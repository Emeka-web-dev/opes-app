export const useCurrencyFormatter = (number: any) => {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    roundingMode: "trunc",
  }).format(number);

  return formatter;
};
