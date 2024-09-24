import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function isUserSubscribed() {
  const { userId } = auth();

  const subscriptions = await prismadb.subscription.findMany({
    where: { userId: userId },
  });

  // Show active subscriptions first, then paused, then canceled
  const sortedSubscriptions = subscriptions.sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;

    if (a.status === "paused" && b.status === "cancelled") return -1;

    return 0;
  });

  if (sortedSubscriptions[0].status === "active") {
    return true;
  } else {
    return false;
  }
}
