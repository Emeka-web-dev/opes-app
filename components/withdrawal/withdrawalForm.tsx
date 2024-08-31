import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";

type WithdrawalFormType = {
  amount: number;
};
export const WithdrawalForm = ({
  amount: withdrawableAmount,
}: WithdrawalFormType) => {
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [passwordToggle, setPasswordToggle] = useState<"text" | "password">(
    "password"
  );
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (amountError) return;
  };

  useEffect(() => {
    setAmountError("");
    if (Number(amount) < 100)
      setAmountError("the minimum withdrawal amount is ₦100");
    if (Number(amount) > withdrawableAmount)
      setAmountError(
        `The amount you entered is greater than the maximum withdrawable amount of ₦${withdrawableAmount}`
      );
  }, [amountError, amount, withdrawableAmount]);

  return (
    <form className="p-4 flex flex-col gap-y-4" onSubmit={onSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount (₦)
        </label>
        <Input
          type="number"
          className="mt-1 block w-full p-6 border border-gray-300 rounded-full shadow-sm focus:ring-[#4b2e9b] focus:border-[#4b2e9b] sm:text-sm custom-number-input"
          placeholder="Enter withdrawable amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <p className="text-xs text-red-500 p-2">{amountError}</p>
      </div>

      <div className="">
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 relative">
          <Input
            type={passwordToggle}
            className="block w-full p-6 border border-gray-300 rounded-full shadow-sm focus:ring-[#4b2e9b] focus:border-[#4b2e9b] sm:text-sm"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={() =>
              passwordToggle === "password"
                ? setPasswordToggle("text")
                : setPasswordToggle("password")
            }
            className="absolute top-[50%] translate-y-[-50%] right-6 cursor-pointer"
          >
            {passwordToggle === "password" ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </span>
        </div>
      </div>
      <Button type="submit">Withdraw</Button>
    </form>
  );
};
