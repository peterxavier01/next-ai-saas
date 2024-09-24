import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

import { getApiLimitCount } from "@/lib/api-limit";

import { isUserSubscribed } from "@/hooks/use-is-subscribed";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  const isSubscribed = await isUserSubscribed();

  return (
    <div className="relative h-full">
      <div className="hidden h-full bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
        <Sidebar apiLimitCount={apiLimitCount} isSubscribed={isSubscribed} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
