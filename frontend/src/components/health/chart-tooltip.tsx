"use client";

type TooltipPayloadItem = {
  name?: string;
  value?: number | string;
  color?: string;
};

type ChartTooltipProps = {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
};

function getTooltipUnit(name?: string) {
  if (name === "used") return " GB";
  if (name === "current" || name === "average") return "%";
  return "";
}

export default function ChartTooltip({
  active,
  payload,
  label,
}: ChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-xl border border-border bg-popover px-3 py-2 text-[13px] text-popover-foreground shadow-lg">
      <p className="mb-1.5 font-bold">{label}</p>

      {payload.map((item) => (
        <p key={`${item.name}-${label}`} style={{ color: item.color }}>
          {item.name}: {item.value}
          {getTooltipUnit(item.name)}
        </p>
      ))}
    </div>
  );
}