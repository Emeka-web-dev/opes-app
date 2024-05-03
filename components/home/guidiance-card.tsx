import { LucideIcon } from "lucide-react";
import React from "react";

interface GuidanceProps {
  icon: LucideIcon;
  header: string;
  caption: string;
}
export const GuidianceCard = ({
  icon: Icon,
  header,
  caption,
}: GuidanceProps) => {
  return (
    <div className="flex flex-col items-center justify-center group px-2 space-y-2 max-w-96 mx-auto">
      <div className="p-5 flex items-center justify-center rounded-3xl bg-gray-100 dark:bg-[#30334e]/50 text-[#8b5cf6] group-hover:bg-[#8b5cf6] group-hover:text-gray-100">
        <Icon className="w-10 h-10" />
      </div>
      <h3 className="text-2xl font-semibold ">{header}</h3>
      <p className="text-gray-700 text-center dark:text-white/70">{caption}</p>
    </div>
  );
};
