"use client";

import { useMemo, useState } from "react";

import AccessControlActivityLogTable from "./access-control-activity-log-table";
import AccessControlActivityLogTools from "./access-control-activity-log-tools";
import type { AccessControlActivityLog } from "@/types/access-control/activity-log";
import { activityLogs } from "@/data/access-control/activity-log";

const AccessControlActivityLogView = () => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const totalCount = activityLogs.length;
  const isLoading = false;
  const isError = false;

  const data: AccessControlActivityLog[] = useMemo(() => {
    const start = page * rowsPerPage;
    return activityLogs.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage]);

  return (
    <section className="space-y-4">
      <AccessControlActivityLogTools />
      <AccessControlActivityLogTable
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={() => {}}
        data={data}
        totalCount={totalCount}
        isLoading={isLoading}
        isError={isError}
      />
    </section>
  );
};

export default AccessControlActivityLogView;
