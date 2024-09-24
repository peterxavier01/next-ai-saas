"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";

interface MobileSidebarProps {
  apiLimitCount: number;
  isSubscribed: boolean;
}

const MobileSidebar = ({ apiLimitCount, isSubscribed }: MobileSidebarProps) => {
  // Hydration error fix
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger>
        <div className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground md:hidden">
          <Menu />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar apiLimitCount={apiLimitCount} isSubscribed={isSubscribed} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
