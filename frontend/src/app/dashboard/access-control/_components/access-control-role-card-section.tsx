import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { AccessControlRoleCard } from "./access-control-role-card";

type Props = Parameters<typeof AccessControlRoleCard>[0];

function RoleCardSkeleton() {
  return (
    <Card className="overflow-hidden p-0">
      <div className="flex h-24 items-center justify-center bg-muted/60">
        <Skeleton className="size-10 rounded-none" />
      </div>

      <div className="space-y-3 px-5 pt-4 pb-5">
        <CardHeader className="gap-1 p-0">
          <Skeleton className="h-5 w-1/2 rounded-md" />
          <Skeleton className="h-4 w-2/3 rounded-md" />
        </CardHeader>

        <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-4 w-12 rounded-md" />
        </div>
      </div>
    </Card>
  );
}

export function AccessControlRoleCardSection({
  roles,
  loading = false,
}: {
  roles?: Props[];
  loading?: boolean;
}) {
  const shouldShowSkeleton = loading || !roles || roles.length === 0;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-heading-lg text-lg font-bold">
          Vai trò người dùng
        </h2>

        <Button
          type="button"
          variant="link"
          className="h-auto gap-2 px-0 text-primary-foreground font-semibold text-sm hover:cursor-pointer"
        >
          + Thêm vai trò mới
        </Button>
      </div>

      {shouldShowSkeleton ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <RoleCardSkeleton />
          <RoleCardSkeleton />
          <RoleCardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {roles.map((role) => (
            <AccessControlRoleCard key={role.title} {...role} />
          ))}
        </div>
      )}
    </section>
  );
}
