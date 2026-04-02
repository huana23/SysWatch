import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type MarketingChannelTableRow = {
  platform: string;
  platformDotClassName: string;
  reach: string;
  ctr: string;
  cost: string;
  cpc: string;
};

type MarketingChannelTableProps = {
  title: string;
  exportLabel: string;
  platformLabel: string;
  reachLabel: string;
  ctrLabel: string;
  costLabel: string;
  cpcLabel: string;
  rows: readonly MarketingChannelTableRow[];
};

export default function MarketingChannelTable({
  title,
  exportLabel,
  platformLabel,
  reachLabel,
  ctrLabel,
  costLabel,
  cpcLabel,
  rows,
}: MarketingChannelTableProps) {
  return (
    <Card className="rounded-2xl border border-border bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b px-5 pt-4 pb-2 border-0">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>

        <Button
          variant="link"
          className="h-auto p-0 text-sm font-semibold text-orange-500 hover:text-orange-600"
        >
          {exportLabel}
        </Button>
      </CardHeader>

      <CardContent className="overflow-x-auto p-0 border-1">
        <table className="w-full min-w-[720px] p-0">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <th className="px-5 py-4 font-semibold">{platformLabel}</th>
              <th className="px-5 py-4 font-semibold">{reachLabel}</th>
              <th className="px-5 py-4 font-semibold">{ctrLabel}</th>
              <th className="px-5 py-4 font-semibold">{costLabel}</th>
              <th className="px-5 py-4 font-semibold">{cpcLabel}</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={row.platform}
                className="border-b border-border last:border-b-0"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <span
                      className={`h-2 w-2 rounded-full ${row.platformDotClassName}`}
                    />
                    <span>{row.platform}</span>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-foreground">{row.reach}</td>
                <td className="px-5 py-4 text-sm text-foreground">{row.ctr}</td>
                <td className="px-5 py-4 text-sm text-foreground">{row.cost}</td>
                <td className="px-5 py-4 text-sm text-foreground">{row.cpc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}