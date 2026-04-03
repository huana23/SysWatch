import type { ReactNode } from "react";

import { Minus, TriangleAlert, TrendingDown, TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { ChangeType } from "@/lib/change-trend";

type StatusVariant = "success" | "warning" | "danger";

type StatusCardProps = {
  variant?: StatusVariant;
  label: string;
  title: string;
  note: string;
  icon: ReactNode;
  noteChangeType?: ChangeType;
  noteIcon?: ReactNode;
};

const variantMap: Record<
  StatusVariant,
  {
    bar: string;
    title: string;
    icon: string;
  }
> = {
  success: {
    bar: "before:bg-green-500",
    title: "text-green-500",
    icon: "text-green-100",
  },
  warning: {
    bar: "before:bg-yellow-500",
    title: "text-yellow-500",
    icon: "text-yellow-100",
  },
  danger: {
    bar: "before:bg-red-500",
    title: "text-red-500",
    icon: "text-red-100",
  },
};

export default function StatusCard({
  variant = "success",
  label,
  title,
  note,
  icon,
  noteChangeType,
  noteIcon,
}: StatusCardProps) {
  const styles = variantMap[variant];

  const TrendIcon =
    variant === "danger"
      ? TriangleAlert
      : noteChangeType === "positive"
        ? TrendingUp
        : noteChangeType === "negative"
          ? TrendingDown
          : noteChangeType === "neutral"
            ? Minus
            : null;

  const renderedNoteIcon = TrendIcon ? (
    <TrendIcon className="h-3.5 w-3.5" />
  ) : noteIcon ? (
    noteIcon
  ) : null;

  return (
    <Card
      className={`relative min-h-32 w-full overflow-hidden border-0 shadow-sm before:absolute before:inset-y-0 before:left-0 before:w-1 ${styles.bar}`}
    >
      <CardContent className="flex min-h-25 items-center justify-between px-6">
        <div className="min-w-0">
          <span className="mb-1 block text-1.5xl font-medium leading-5 text-slate-500">
            {label}
          </span>

          <h3 className={`mb-1 text-2xl font-bold leading-8 ${styles.title}`}>
            {title}
          </h3>

          <p className="flex items-center gap-1 text-xs font-normal leading-4 text-slate-400">
            {renderedNoteIcon ? (
              <span className="inline-flex w-[14px] shrink-0 justify-center">
                {renderedNoteIcon}
              </span>
            ) : null}
            <span>{note}</span>
          </p>
        </div>

        <div
          className={`flex shrink-0 items-center justify-center ${styles.icon}`}
        >
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}