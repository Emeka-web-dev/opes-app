import { EarningHistory } from "@/typings";
import {
  addDays,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns";

export type EarningHistoryData = {
  createdAt: string;
  amount: number;
};

function generateDateRange(
  endDate: Date,
  interval: "daily" | "weekly" | "monthly"
): string[] {
  let dateRange: string[] = [];
  //   endDate = addDays(endDate, 1); // Set endDate to the next day

  if (interval === "daily") {
    const startDate = subDays(endDate, 6);
    dateRange = eachDayOfInterval({ start: startDate, end: endDate }).map(
      (date) => format(date, "yyyy-MM-dd")
    );
  } else if (interval === "weekly") {
    const startDate = subWeeks(endDate, 3);
    dateRange = eachWeekOfInterval({
      start: startOfWeek(startDate, { weekStartsOn: 1 }),
      end: endOfWeek(endDate, { weekStartsOn: 1 }),
    }).map((date) =>
      format(startOfWeek(date, { weekStartsOn: 1 }), "yyyy-MM-dd")
    );
  } else if (interval === "monthly") {
    const startDate = subMonths(endDate, 11);
    dateRange = eachMonthOfInterval({
      start: startOfMonth(startDate),
      end: endOfMonth(endDate),
    }).map((date) => format(date, "yyyy-MM"));
  }
  return dateRange;
}

function formatLabel(
  date: string,
  interval: "daily" | "weekly" | "monthly"
): string {
  const dateObj = new Date(date);
  //   const nextDay = addDays(currentDate, 1);
  //   const dateObj = nextDay.toISOString();

  if (interval === "daily") {
    return format(dateObj, "EEE"); // Mon, Tue, Wed, etc.
  } else if (interval === "weekly") {
    return `${format(dateObj, "MMM dd")}`; // MMM dd (start of the week)
  } else if (interval === "monthly") {
    return format(dateObj, "MMM"); // Jan, Feb, Mar, etc.
  }

  return date;
}

export function aggregateData(
  data: EarningHistory[],
  interval: "daily" | "weekly" | "monthly"
): { date: string; label: string; amount: number }[] {
  const aggregatedData: { [key: string]: number } = {};
  const endDate = new Date();

  data.forEach(({ createdAt, amount }) => {
    let key: string | undefined;
    // const date = createdAt;

    if (interval === "daily") {
      key = format(createdAt, "yyyy-MM-dd"); // YYYY-MM-DD
    } else if (interval === "weekly") {
      const startOfWeekDate = startOfWeek(createdAt, { weekStartsOn: 1 });
      key = format(startOfWeekDate, "yyyy-MM-dd"); // YYYY-MM-DD of the start of the week
    } else if (interval === "monthly") {
      key = format(createdAt, "yyyy-MM"); // YYYY-MM
    }

    if (key) {
      if (!aggregatedData[key]) {
        aggregatedData[key] = 0;
      }
      aggregatedData[key] += amount;
    }
  });

  const dateRange = generateDateRange(endDate, interval);

  return dateRange.map((date) => ({
    date,
    label: formatLabel(date, interval),
    amount: aggregatedData[date] || 0,
  }));
}
