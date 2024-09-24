import { Badge, BadgeProps } from "@/components/ui/badge";

import { SubscriptionStatusType } from "@/lib/typeguards";

interface SubScriptionStatusProps {
  status: SubscriptionStatusType;
  statusFormatted: string;
  isPaused?: boolean;
}

export function SubscriptionStatus({
  status,
  statusFormatted,
  isPaused,
}: SubScriptionStatusProps) {
  const statusColor: Record<SubscriptionStatusType, BadgeProps["variant"]> = {
    active: "success",
    cancelled: "secondary",
    expired: "destructive",
    past_due: "destructive",
    on_trial: "default",
    unpaid: "destructive",
    pause: "warning",
    paused: "warning",
  };

  const _status = isPaused ? "paused" : status;
  const _statusFormatted = isPaused ? "Paused" : statusFormatted;

  return (
    <>
      {status !== "cancelled" && (
        <span className="text-surface-200">&bull;</span>
      )}

      <Badge
        className="rounded-sm px-1 py-0 text-sm"
        variant={statusColor[_status]}
      >
        {_statusFormatted}
      </Badge>
    </>
  );
}
