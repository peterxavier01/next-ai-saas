import { Subscription } from "@prisma/client";

import { SubscriptionActions } from "@/components/subscription/subscription-actions";
import { SubscriptionPrice } from "@/components/subscription/price";
import { SubscriptionDate } from "@/components/subscription/date";
import { SubscriptionStatus } from "@/components/subscription/status";
import { Card, CardContent } from "@/components/ui/card";

import { getUserSubscriptions } from "@/actions/subscription";

import prismadb from "@/lib/prismadb";
import { SubscriptionStatusType } from "@/lib/typeguards";
import { cn, isValidSubscription } from "@/lib/utils";

const Subscriptions = async () => {
  const userSubscriptions = await getUserSubscriptions();
  const allPlans = await prismadb.plan.findMany();

  if (userSubscriptions.length === 0) {
    return (
      <p className="mb-2">
        It appears that you do not have any subscriptions. Please sign up for a
        plan below.
      </p>
    );
  }

  // Show active subscriptions first, then paused, then canceled
  const sortedSubscriptions = userSubscriptions.sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;

    if (a.status === "paused" && b.status === "cancelled") return -1;

    return 0;
  });

  return (
    <section>
      {sortedSubscriptions.map((subscription: Subscription, index: number) => {
        const plan = allPlans.find((p) => p.id === subscription.planId);
        const status = subscription.status as SubscriptionStatusType;

        if (!plan) {
          throw new Error("Plan not found");
        }

        return (
          <section
            key={index}
            className="flex-col items-stretch justify-center gap-2"
          >
            <Card className="mb-8">
              <CardContent className="px-6 py-8">
                <header className="mb-2 flex flex-wrap items-center justify-between gap-3 md:flex-nowrap">
                  <div className="flex min-h-8 flex-wrap items-center gap-x-3 gap-y-1">
                    <h2
                      className={cn(
                        "text-lg font-medium text-slate-800",
                        !isValidSubscription(status) && "text-inherit",
                      )}
                    >
                      {plan.productName} ({plan.name})
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <SubscriptionActions subscription={subscription} />
                  </div>
                </header>

                <div className="flex flex-wrap items-center gap-2">
                  <SubscriptionPrice
                    endsAt={subscription.endsAt}
                    interval={plan.interval}
                    intervalCount={plan.intervalCount}
                    price={subscription.price}
                    isUsageBased={plan.isUsageBased ?? false}
                  />

                  <SubscriptionStatus
                    status={status}
                    statusFormatted={subscription.statusFormatted}
                    isPaused={Boolean(subscription.isPaused)}
                  />

                  <SubscriptionDate
                    endsAt={subscription.endsAt}
                    renewsAt={subscription.renewsAt}
                    status={status}
                    trialEndsAt={subscription.trialEndsAt}
                  />
                </div>
              </CardContent>
            </Card>
          </section>
        );
      })}
    </section>
  );
};

export default Subscriptions;
