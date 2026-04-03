import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SupportSlaMetricItem = {
  label: string;
  valueLabel: string;
  progress: number;
  barClassName: string;
  valueClassName: string;
};

type SupportSlaCardProps = {
  title: string;
  items: readonly SupportSlaMetricItem[];
  note: string;
};

export default function SupportSlaCard({
  title,
  items,
  note,
}: SupportSlaCardProps) {
  return (
    <Card className="flex h-full min-w-0 flex-col rounded-2xl border border-border bg-card shadow-sm">
      <CardHeader className="border-b px-5 py-4">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col p-5">
        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide">
                <span className="text-muted-foreground">{item.label}</span>
                <span className={item.valueClassName}>{item.valueLabel}</span>
              </div>

              <div className="h-2 rounded-full bg-muted">
                <div
                  className={`h-2 rounded-full ${item.barClassName}`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto rounded-2xl border border-border bg-muted/40 p-4 text-xs leading-5 text-muted-foreground">
          {note}
        </div>
      </CardContent>
    </Card>
  );
}