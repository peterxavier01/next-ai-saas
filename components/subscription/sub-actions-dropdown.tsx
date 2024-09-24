"use client";

import { useState } from "react";
import { MoreVerticalIcon } from "lucide-react";
import { Subscription } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LemonSqueezyModalLink } from "@/components/subscription/subscription-modal";

import {
  cancelSub,
  pauseUserSubscription,
  unpauseUserSubscription,
  type getSubscriptionURLs,
} from "@/actions/subscription";

interface SubscriptionActionsDropdownProps {
  subscription: Subscription;
  urls: Awaited<ReturnType<typeof getSubscriptionURLs>>;
}

export function SubscriptionActionsDropdown({
  subscription,
  urls,
}: SubscriptionActionsDropdownProps) {
  const [loading, setLoading] = useState(false);

  if (
    subscription.status === "expired" ||
    subscription.status === "cancelled" ||
    subscription.status === "unpaid"
  ) {
    return null;
  }

  return (
    <>
      {loading && (
        <div className="bg-surface-50/50 absolute inset-0 z-10 mt-4 flex items-center justify-start rounded-md">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-primary *:border-t-transparent" />
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className="data-[state=open]:bg-surface-50 h-8 w-10"
          >
            <MoreVerticalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" className="z-10" align="end">
          <DropdownMenuGroup>
            {!subscription.isPaused && (
              <DropdownMenuItem
                onClick={async () => {
                  setLoading(true);
                  await pauseUserSubscription(subscription.lemonSqueezyId).then(
                    () => {
                      setLoading(false);
                    },
                  );
                }}
              >
                Pause payments
              </DropdownMenuItem>
            )}

            {subscription.isPaused && (
              <DropdownMenuItem
                onClick={async () => {
                  setLoading(true);
                  await unpauseUserSubscription(
                    subscription.lemonSqueezyId,
                  ).then(() => {
                    setLoading(false);
                  });
                }}
              >
                Unpause payments
              </DropdownMenuItem>
            )}

            <DropdownMenuItem asChild>
              <a href={urls?.customer_portal}>Customer portal ↗</a>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <LemonSqueezyModalLink href={urls?.update_payment_method}>
                Update payment method
              </LemonSqueezyModalLink>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={async () => {
                if (
                  confirm(
                    `Please confirm if you want to cancel your subscription.`,
                  )
                ) {
                  setLoading(true);
                  await cancelSub(subscription.lemonSqueezyId).then(() => {
                    setLoading(false);
                  });
                }
              }}
            >
              Cancel subscription
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
