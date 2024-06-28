"use client";
import { aggregateData } from "@/hooks/aggregate-chart";
import { EarningHistory } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Text,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IntervalType } from "./line-chart-dropdown";
import { cn } from "@/lib/utils";

type Props = {
  selectedValue: IntervalType;
  data: EarningHistory[];
};

type AggregatedData = {
  date: string;
  label: string;
  amount: number;
};

export const Linechart = ({ selectedValue, data }: Props) => {
  const [aggregatedData, setAggregatedData] = useState<AggregatedData[]>([]);

  useEffect(() => {
    setAggregatedData(aggregateData(data, selectedValue));
  }, [selectedValue, data]);

  return (
    <div className="h-72 overflow-x-auto">
      <div
        className={cn(
          "w-full h-full min-w-[500px]",
          selectedValue !== "monthly" && "min-w-[400px]"
        )}
      >
        <ResponsiveContainer
          className="pr-4 text-sm"
          width="100%"
          height="100%"
        >
          <LineChart data={aggregatedData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="label" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickCount={30}
              tickFormatter={abbreviateNumber}
              tickMargin={0}
              tick={<CustomYAxisTick />}
            />
            <Tooltip content={<CustomTooltip stroke="#63cba5" />} />
            <Line type="monotone" dataKey="amount" stroke="#4b2e9b" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

function CustomTooltip({ payload, label, active }: any) {
  if (active) {
    return (
      <div className="p-2 bg-gray-100 shadow-lg flex flex-col gap-4 rounded-md">
        <p className="text-[#4b2e9b]">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
}

const abbreviateNumber = (number: number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "k";
  } else {
    return number.toString();
  }
};

const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <Text
      x={x}
      y={y}
      textAnchor="end"
      verticalAnchor="middle"
      fill="#333"
      fontSize={12}
      fontWeight="bold"
    >
      {abbreviateNumber(payload.value)}
    </Text>
  );
};
