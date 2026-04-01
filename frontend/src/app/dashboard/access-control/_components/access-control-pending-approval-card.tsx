import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  label: string;
  createdAgo: string;
  requesterName: string;
  summary: string;
  onApprove?: () => void;
  onReject?: () => void;
};

const AccessControlPendingApprovalCard = ({
  label,
  createdAgo,
  requesterName,
  summary,
  onApprove,
  onReject,
}: Props) => {
  return (
    <Card className="ac-info-surface rounded-xl border p-4 shadow-none ring-0">
      <CardHeader className="gap-2 p-0">
        <div className="flex items-center justify-between">
          <span className="font-bold text-primary-foreground text-xs uppercase tracking-wide">
            {label}
          </span>
          <span className="text-[oklch(0.7107_0.0351_256.79)] text-xs">
            {createdAgo}
          </span>
        </div>

        <div className="space-y-0.5">
          <CardTitle className="font-semibold text-heading-lg text-sm">
            {requesterName}
          </CardTitle>
          <CardDescription className="text-heading-md text-xs">
            {summary}
          </CardDescription>
        </div>
      </CardHeader>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button
          type="button"
          onClick={onApprove}
          className="h-7"
          variant="primary"
        >
          Phê duyệt
        </Button>
        <Button
          type="button"
          variant="reject"
          onClick={onReject}
          className="h-7"
        >
          Từ chối
        </Button>
      </div>
    </Card>
  );
};

export default AccessControlPendingApprovalCard;
