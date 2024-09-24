import { UserButton } from "@clerk/nextjs";

import MobileSidebar from "./mobile-sidebar";

import { getApiLimitCount } from "@/lib/api-limit";

import { isUserSubscribed } from "@/hooks/use-is-subscribed";

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();
  const isSubscribed = await isUserSubscribed();

  return (
    <div className="flex items-center p-4">
      <MobileSidebar
        apiLimitCount={apiLimitCount}
        isSubscribed={isSubscribed}
      />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
