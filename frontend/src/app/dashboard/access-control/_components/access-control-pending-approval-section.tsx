import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import AccessControlPendingApprovalCard from "./access-control-pending-approval-card";

type Props = {
  loading?: boolean;
  items?: Parameters<typeof AccessControlPendingApprovalCard>[0][];
};

function PendingApprovalSkeleton() {
  return (
    <Card className="ac-info-surface rounded-2xl border p-4 shadow-none ring-0">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32 rounded-md" />
        <Skeleton className="h-4 w-20 rounded-md" />
      </div>
      <div className="mt-3 space-y-2">
        <Skeleton className="h-6 w-40 rounded-md" />
        <Skeleton className="h-4 w-56 rounded-md" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Skeleton className="h-10 rounded-xl" />
        <Skeleton className="h-10 rounded-xl" />
      </div>
    </Card>
  );
}

const AccessControlPendingApprovalSection = ({
  items,
  loading = false,
}: Props) => {
  const showSkeleton = loading || !items || items.length === 0;

  return (
    <section className="space-y-4">
      <h2 className="font-bold text-heading-lg text-lg">
        Luồng phê duyệt (Pending)
      </h2>

      <div className="space-y-4">
        {showSkeleton ? (
          <>
            <PendingApprovalSkeleton />
            <PendingApprovalSkeleton />
          </>
        ) : (
          items.map((item) => (
            <AccessControlPendingApprovalCard
              key={`${item.label}-${item.requesterName}-${item.createdAgo}`}
              {...item}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default AccessControlPendingApprovalSection;
