import { Suspense } from "react";
import { Settings } from "lucide-react";

import { Plans } from "@/components/plans";
import Heading from "@/components/heading";
import ScriptLoader from "./_components/script-loader";
import Subscriptions from "@/components/subscriptions";

export const dynamic = "force-dynamic";

const SettingsPage = () => {
  return (
    <>
      <ScriptLoader />

      <div>
        <Heading
          title="Settings"
          description="Change your billing details"
          icon={Settings}
          iconColor="text-slate-800"
          bgColor="bg-slate-500/10"
        />

        <div className="px-4 lg:px-8">
          <Suspense fallback={<p>Loading Subscriptions...</p>}>
            <Subscriptions />
          </Suspense>

          <Suspense fallback={<p>Loading plans...</p>}>
            <Plans />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
