"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type IntervalType = "daily" | "weekly" | "monthly";
type Props = {
  onChange: (value: IntervalType) => void;
};
export const LineChartDropDown = ({ onChange }: Props) => {
  return (
    <div className="flex space-x-2 items-center">
      <h4 className="font-semibold text-sm">Sort by:</h4>
      <Select defaultValue="daily" onValueChange={onChange}>
        <SelectTrigger className="w-28 border-none">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="daily">Daily</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
