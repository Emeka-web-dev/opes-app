import { Check } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface PricingProps {
  name: string;
  amount: string;
  points: string[];
}
export const PricingContainer = ({ name, amount, points }: PricingProps) => {
  return (
    <div className="border border-gray-400 px-8 py-6 max-w-96 mx-auto w-full rounded-2xl flex flex-col relative overflow-hidden bg-inherit">
      <div className="absolute w-[350px] h-[350px] rounded-full -top-56 -left-14 bg-[#f4fafe] dark:bg-[#919bb1] -z-10" />
      <div className="absolute w-[250px] h-[250px] rounded-full -top-40 -right-14 bg-[#e62e2d]/5  dark:bg-[#cec3d8]/20 -z-10" />
      <div className="flex flex-col ">
        <h4 className="text-2xl p-0 m-0">{name}</h4>
        <h3 className="text-3xl font-semibold">N{amount}</h3>
      </div>
      <div className="mt-12">
        {points.map((point, i) => (
          <div key={i} className="flex items-center space-x-2">
            <Check className="w-4 h-4" />
            <p className="text-sm text-gray-700 dark:text-gray-300">{point}</p>
          </div>
        ))}
      </div>
      <Button className="mt-5">Choose {name}</Button>
    </div>
  );
};
