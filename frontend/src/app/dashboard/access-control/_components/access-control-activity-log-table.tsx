"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AccessControlActivityLog } from "@/types/access-control/activity-log";
import { accessControlActivityLogColumns } from "./access-control-activity-log-columns";

type Props = {
  data: AccessControlActivityLog[];
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
};

const AccessControlActivityLogTable = ({
  data,
  totalCount,
  isLoading,
  isError,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: Props) => {
  const columns = accessControlActivityLogColumns;
  const from = totalCount === 0 ? 0 : page * rowsPerPage + 1;
  const to = Math.min(totalCount, (page + 1) * rowsPerPage);

  return (
    <Card className="overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-none ring-0 gap-0">
      {isLoading && (
        <p className="p-4 text-center text-muted-foreground text-sm">
          Đang tải...
        </p>
      )}

      {isError && (
        <p className="p-4 text-center text-destructive text-sm">
          Không thể kết nối API.
        </p>
      )}

      {!isLoading && !isError && (
        <>
          <Table className="text-sm">
            <TableHeader className="bg-muted">
              <TableRow>
                {columns.map((col) => (
                  <TableHead
                    key={col.header}
                    className={[
                      "h-14 px-6 text-heading-md font-bold",
                      col.align === "right" ? "text-right" : "",
                    ].join(" ")}
                  >
                    {col.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="px-6 py-10 text-center text-heading-lg font-normal"
                  >
                    Chưa có dữ liệu.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row) => (
                  <TableRow key={row.id} className="hover:bg-transparent">
                    {columns.map((col) => (
                      <TableCell
                        key={col.header}
                        className={[
                          "px-6 py-3.5 align-center",
                          col.align === "right" ? "text-right" : "",
                        ].join(" ")}
                      >
                        {col.cell(row)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between gap-4 border-t bg-muted px-6 py-4">
            <p className="text-heading-md text-xs">
              Hiển thị{" "}
              <span className="font-medium text-foreground">{data.length}</span>{" "}
              trên{" "}
              <span className="font-medium text-foreground">{totalCount}</span>{" "}
              hoạt động
              {totalCount > 0 ? (
                <span className="text-muted-foreground">
                  {" "}
                  ({from}-{to})
                </span>
              ) : null}
            </p>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="icon-xs"
                variant="pagination"
                onClick={() => onPageChange(Math.max(0, page - 1))}
                disabled={page <= 0}
                aria-label="Trang trước"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                type="button"
                size="icon-xs"
                variant="pagination"
                onClick={() => onPageChange(page + 1)}
                disabled={(page + 1) * rowsPerPage >= totalCount}
                aria-label="Trang sau"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default AccessControlActivityLogTable;
