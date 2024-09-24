import { SubscriptionStatusType } from "@/lib/typeguards";
import { formatDate } from "@/lib/utils";

interface SubscriptionDateProps {
  endsAt?: string | null;
  renewsAt?: string | null;
  status: SubscriptionStatusType;
  trialEndsAt?: string | null;
}

export function SubscriptionDate({
  endsAt,
  renewsAt,
  trialEndsAt,
}: SubscriptionDateProps) {
  const now = new Date();
  const trialEndDate = trialEndsAt ? new Date(trialEndsAt) : null;
  const endsAtDate = endsAt ? new Date(endsAt) : null;
  let message = `Renews on ${formatDate(renewsAt)}`;

  if (!trialEndsAt && !renewsAt) return null;

  if (trialEndDate && trialEndDate > now) {
    message = `Ends on ${formatDate(trialEndsAt)}`;
  }

  if (endsAt) {
    message =
      endsAtDate && endsAtDate < now
        ? `Expired on ${formatDate(endsAt)}`
        : `Expires on ${formatDate(endsAt)}`;
  }

  return (
    <>
      {<span className="text-surface-200">&bull;</span>}
      <p>{message}</p>
    </>
  );
}
