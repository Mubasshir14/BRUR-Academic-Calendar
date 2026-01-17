import { holidays } from "../data/holidays";

export function getNextHoliday() {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const future = Object.keys(holidays)
    .filter(d => d > todayStr)
    .sort();

  if (!future.length) return null;

  const nextDate = future[0];
  const diff =
    (new Date(nextDate) - today) / (1000 * 60 * 60 * 24);

  return {
    date: nextDate,
    name: holidays[nextDate].name,
    daysLeft: Math.ceil(diff),
  };
}
