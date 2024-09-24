"use client";

import { Check, Zap } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LemonSqueezyModalLink } from "@/components/subscription/subscription-modal";
import { Button } from "@/components/ui/button";

import { useProModal } from "@/hooks/use-pro-modal";

import { cn, tools } from "@/lib/utils";

const ProModal = () => {
  const proModal = useProModal();

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Upgrade to Genius</DialogTitle>
          <div className="flex flex-col items-center justify-center gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 py-1 font-bold">
              Upgrade to Genius
              <Badge variant="premium" className="py-1 text-sm uppercase">
                pro
              </Badge>
            </div>
          </div>

          <DialogDescription className="space-y-2 pt-2 text-center font-medium text-zinc-900">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="flex items-center justify-between border-black/5 p-3"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("w-fit rounded-md p-2", tool.bgColor)}>
                    <tool.icon className={cn("h-6 w-6", tool.color)} />
                  </div>
                  <div className="text-sm font-semibold">{tool.label}</div>
                </div>
                <Check className="h-5 w-5 text-primary" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <LemonSqueezyModalLink
            href="https://brainy-ai.lemonsqueezy.com/buy/352b3bea-3394-4e73-af39-4c0b58e31a96"
            className="w-full"
          >
            <Button size="lg" variant="premium" className="w-full">
              Upgrade <Zap className="ml-2 h-4 w-4 fill-white" />
            </Button>
          </LemonSqueezyModalLink>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
