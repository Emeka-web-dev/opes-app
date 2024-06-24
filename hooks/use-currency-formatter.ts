export const useCurrencyFormatter = (number: any) => {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(number);

  return formatter;
};
