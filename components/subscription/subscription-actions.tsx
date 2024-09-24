import { Subscription } from "@prisma/client";

import { SubscriptionActionsDropdown } from "@/components/subscription/sub-actions-dropdown";

import { getSubscriptionURLs } from "@/actions/subscription";

export async function SubscriptionActions({
  subscription,
}: {
  subscription: Subscription;
}) {
  if (
    subscription.status === "expired" ||
    subscription.status === "cancelled" ||
    subscription.status === "unpaid"
  ) {
    return null;
  }

  const urls = await getSubscriptionURLs(subscription.lemonSqueezyId);

  return (
    <div className="relative">
      <SubscriptionActionsDropdown subscription={subscription} urls={urls} />
    </div>
  );
}
