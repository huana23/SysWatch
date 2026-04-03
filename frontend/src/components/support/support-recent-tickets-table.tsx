import type { ElementType } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SupportRecentTicketDisplayRow = {
  id: string;
  customer: string;
  issue: string;
  channelIcon: ElementType;
  channelIconClassName: string;
  statusLabel: string;
  statusClassName: string;
  sla: string;
  slaClassName: string;
};

type SupportRecentTicketsTableProps = {
  title: string;
  viewAllLabel: string;
  rows: readonly SupportRecentTicketDisplayRow[];
};

export default function SupportRecentTicketsTable({
  title,
  viewAllLabel,
  rows,
}: SupportRecentTicketsTableProps) {
  return (
    <Card className="flex h-full min-w-0 flex-col rounded-2xl border border-border bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b px-5 py-4">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>

        <Button
          variant="link"
          className="h-auto p-0 text-sm font-semibold text-primary"
        >
          {viewAllLabel}
        </Button>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col p-0">
        <div className="flex-1 overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-4 font-semibold">ID &amp; Khách hàng</th>
                <th className="px-5 py-4 font-semibold">Vấn đề</th>
                <th className="px-5 py-4 font-semibold">Kênh</th>
                <th className="px-5 py-4 font-semibold">Trạng thái</th>
                <th className="px-5 py-4 font-semibold">SLA</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => {
                const ChannelIcon = row.channelIcon;

                return (
                  <tr key={row.id} className="border-b border-border last:border-b-0">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-foreground">{row.id}</div>
                      <div className="text-sm text-muted-foreground">{row.customer}</div>
                    </td>

                    <td className="px-5 py-4 text-sm text-foreground">{row.issue}</td>

                    <td className="px-5 py-4">
                      <ChannelIcon className={`h-4 w-4 ${row.channelIconClassName}`} />
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${row.statusClassName}`}
                      >
                        {row.statusLabel}
                      </span>
                    </td>

                    <td className={`px-5 py-4 text-sm font-medium ${row.slaClassName}`}>
                      {row.sla}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}