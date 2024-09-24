import { Plan as NewPlan } from "@prisma/client";

import { Card, CardContent } from "@/components/ui/card";
import SubscribeBtn from "@/components/subscribe-btn";

import { formatPrice } from "@/lib/utils";

export const Plan = ({ plan }: { plan: NewPlan }) => {
  const { description, productName, price, interval } = plan;

  return (
    <Card className="max-w-sm p-4">
      <CardContent>
        <h2 className="mb-2 text-lg font-medium text-muted-foreground md:text-xl">
          {productName} ({"Premium"})
        </h2>
        {description ? (
          <div
            className="mb-4 border-b border-neutral-900/10 pb-4 text-sm text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          ></div>
        ) : (
          <div className="mb-4 border-b border-neutral-900/10 pb-4 text-sm text-muted-foreground">
            Unlimited AI generations
          </div>
        )}
        <p className="mb-4 text-xl font-medium text-slate-800">
          {formatPrice(price, "en-NG", "NGN")}{" "}
          <span className="text-base font-normal">per {interval}</span>
        </p>
        <SubscribeBtn plan={plan} />
      </CardContent>
    </Card>
  );
};
