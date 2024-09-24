"use client";

import React, { useEffect, useState } from "react";
import { Zap } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

import { useProModal } from "@/hooks/use-pro-modal";

import { MAX_FREE_TRIALS } from "@/constants";

interface FreeCounterProps {
  apiLimitCount: number;
  isSubscribed: boolean;
}

const FreeCounter = ({ apiLimitCount = 0, isSubscribed }: FreeCounterProps) => {
  const [mounted, setMounted] = useState(false);
  const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isSubscribed) return null;

  if (!mounted) {
    return null;
  }

  return (
    <div className="px-3">
      <Card className="border-0 bg-white/10">
        <CardContent className="py-6">
          <div className="mb-4 space-y-2 text-center text-sm text-white">
            <p>
              {apiLimitCount} / {MAX_FREE_TRIALS} Free Generations
            </p>
            <Progress
              value={(apiLimitCount / MAX_FREE_TRIALS) * 100}
              className="h-3"
            />
          </div>
          <Button
            className="w-full"
            variant="premium"
            onClick={proModal.onOpen}
          >
            Upgrade
            <Zap className="ml-2 h-4 w-4 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
