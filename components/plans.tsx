import Image from "next/image";
import { Plan as NewPlan } from "@prisma/client";

import { Plan } from "@/components/plan";

import prismadb from "@/lib/prismadb";
import { SubscriptionStatusType } from "@/lib/typeguards";

import { getUserSubscriptions, syncPlans } from "@/actions/subscription";

interface PlansProps {
  isChangingPlans?: boolean;
}

export async function Plans({ isChangingPlans = false }: PlansProps) {
  let allPlans: NewPlan[] = await prismadb.plan.findMany();
  const userSubscriptions = await getUserSubscriptions();

  // Do not show plans if the user already has a valid subscription.
  if (userSubscriptions.length > 0) {
    const hasValidSubscription = userSubscriptions.some((subscription) => {
      const status = subscription.status as SubscriptionStatusType;

      return (
        status !== "cancelled" && status !== "expired" && status !== "unpaid"
      );
    });

    if (hasValidSubscription && !isChangingPlans) {
      return null;
    }
  }

  // If there are no plans in the database, sync them from Lemon Squeezy.
  if (!allPlans.length) {
    allPlans = await syncPlans();
  }

  if (!allPlans.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-0">
        <div className="relative h-[200px] w-[300px] md:w-[450px]">
          <Image
            src="/subscribe.jpg"
            alt="no active subscription illustration"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-slate-800">No active subscription.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 md:gap-4">
        <h2 className="text-xl font-semibold md:text-2xl">Plans</h2>
        <div className="w-full border border-neutral-800/5" />
      </div>

      <div className="mb-5 mt-3 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
        {allPlans.map((plan, index) => {
          return <Plan key={`plan-${index}`} plan={plan} />;
        })}
      </div>
    </div>
  );
}
