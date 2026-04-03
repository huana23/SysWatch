import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SlaItem } from "@/types/partners";

type PartnerSlaTableProps = {
  title: string;
  viewAllLabel: string;
  partnerColumnLabel: string;
  slaColumnLabel: string;
  avgTimeColumnLabel: string;
  data: readonly SlaItem[];
};

function getStatusColor(status: "good" | "warning" | "danger") {
  if (status === "good") return "bg-emerald-500";
  if (status === "warning") return "bg-amber-500";
  return "bg-rose-500";
}

export default function PartnerSlaTable({
  title,
  viewAllLabel,
  partnerColumnLabel,
  slaColumnLabel,
  avgTimeColumnLabel,
  data,
}: PartnerSlaTableProps) {
  return (
    <Card className="flex min-w-0 flex-col rounded-2xl border border-border bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b px-5 py-4">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>

        <Button
          variant="link"
          className="h-auto p-0 text-sm font-semibold text-primary"
        >
          {viewAllLabel}
        </Button>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col p-5">
        <div className="grid grid-cols-[1.6fr_1fr_0.8fr] gap-4 border-b border-border pb-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          <span>{partnerColumnLabel}</span>
          <span>{slaColumnLabel}</span>
          <span>{avgTimeColumnLabel}</span>
        </div>

        <div className="flex-1 divide-y divide-border">
          {data.map((item) => (
            <div
              key={item.code}
              className="grid grid-cols-[1.6fr_1fr_0.8fr] items-center gap-4 py-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold ${item.badgeClassName}`}
                >
                  {item.code}
                </div>

                <span className="text-sm font-medium text-foreground">
                  {item.name}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-foreground">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${getStatusColor(item.status)}`}
                />
                <span>{item.sla}</span>
              </div>

              <div className="text-sm font-medium text-foreground">
                {item.avgTime}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}