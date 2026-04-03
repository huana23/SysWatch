import type {ActivityTimelineItemProps} from "@/types/overview";

export default function ActivityTimelineItem({
  item,
  isLast,
}: ActivityTimelineItemProps) {
  const isActive = item.isActive ?? false;

  return (
    <div className="relative flex min-h-[112px] gap-4">
      <div className="relative flex w-8 shrink-0 justify-center">
        {!isLast && (
          <span className="absolute left-1/2 top-[45px] bottom-[-3px] w-[2px] -translate-x-1/2 rounded-full bg-slate-200 dark:bg-white/12" />
        )}

        <div
          className={`relative z-10 mt-2 flex h-8 w-8 items-center justify-center rounded-full ${
            isActive
              ? "bg-blue-500/15 dark:bg-blue-500/20"
              : "bg-slate-100 dark:bg-white/8"
          }`}
        >
          <span
            className={`block h-4 w-4 rounded-full ${
              isActive
                ? "bg-blue-500"
                : "bg-slate-400 dark:bg-slate-300/70"
            }`}
          />
        </div>
      </div>

      <div className="min-w-0 pt-2 pb-6">
        <p className="text-[15px] font-semibold leading-6 text-foreground">
          {item.title}
        </p>

        <p className="mt-1 text-[14px] leading-6 text-muted-foreground">
          {item.description}
        </p>

        <p className="mt-2 text-[12px] font-medium text-muted-foreground">
          {item.time}
        </p>
      </div>
    </div>
  );
}