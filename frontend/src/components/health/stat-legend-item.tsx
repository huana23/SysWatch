type StatLegendItemProps = {
  colorClass: string;
  label: string;
  value: string;
};

export default function StatLegendItem({
  colorClass,
  label,
  value,
}: StatLegendItemProps) {
  return (
    <div className="flex items-start gap-1.5">
      <span
        className={`mt-[2px] h-[11px] w-[11px] shrink-0 rounded-full ${colorClass}`}
      />
      <div>
        <small className="block text-xs font-normal leading-4 text-slate-400">
          {label}
        </small>
        <strong className="block text-xs font-semibold leading-4 text-slate-500">
          {value}
        </strong>
      </div>
    </div>
  );
}