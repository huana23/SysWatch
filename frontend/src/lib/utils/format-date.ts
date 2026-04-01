export function formatDateTime(dateTime: string): {
  time: string;
  date: string;
} {
  const [d1, d2] = dateTime.split(" ");
  if (d2) {
    const [y, m, d] = d1.split(/[-/]/);
    const date = y && m && d ? `${d}/${m}/${y}` : d1.replaceAll("-", "/");
    return { time: d2, date };
  }
  return { time: dateTime, date: "" };
}
