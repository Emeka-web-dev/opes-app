import { data } from "@/data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Text,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

export const Barchart = () => {
  return (
    <div className="h-72 overflow-x-auto">
      <div className="w-full h-full min-w-[500px]">
        <ResponsiveContainer
          className="pr-4 text-sm"
          width="100%"
          height="100%"
        >
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickCount={30}
              tickFormatter={abbreviateNumber}
              tickMargin={0}
              tick={<CustomYAxisTick />}
            />
            <Tooltip content={<CustomTooltip stroke="#63cba5" />} />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#4b2e9b"
              activeDot={{ r: 5 }}
            />
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
