"use client";

import { Plan } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { getCheckoutURL } from "@/actions/subscription";

interface SubscribeBtnProps {
  plan: Plan;
  currentPlan?: Plan;
  embed?: boolean;
}

export default function SubscribeBtn({
  plan,
  currentPlan,
  embed = true,
}: SubscribeBtnProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isCurrent = plan.id === currentPlan?.id;

  const label = isCurrent ? "Your Plan" : "Subscribe";

  // Ensure Lemon.js is loaded first
  useEffect(() => {
    if (typeof window.createLemonSqueezy === "function") {
      window.createLemonSqueezy();
    }
  });

  const handleCheckout = async () => {
    // Create a checkout and open Lemon.js modal
    let checkoutUrl: string | undefined = "";

    try {
      setLoading(true);
      checkoutUrl = await getCheckoutURL(plan.variantId, embed);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast("Error creating a checkout.", {
        description: "Please try again.",
      });
    } finally {
      embed && setLoading(false);
    }

    embed
      ? checkoutUrl && window.LemonSqueezy.Url.Open(checkoutUrl)
      : router.push(checkoutUrl || "/");
  };

  return (
    <Button
      disabled={loading || isCurrent}
      onClick={handleCheckout}
      className="w-full"
    >
      {label}
    </Button>
  );
}
