import React from "react";
import { ContainerLayout } from "./container-layout";
import { GuidianceCard } from "./guidiance-card";
import { Handshake, Settings2, UserRound } from "lucide-react";

export const Guidiance = () => {
  return (
    <ContainerLayout
      header="How it Works"
      caption="To generate income on Opes simply create an account, choose a plan and use your unique referral link to invite others to signup.
"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-4 gap-y-6">
        <div className="">
          <GuidianceCard
            header="Open an Account"
            caption="Choose your preferred plan from our various plans to get your account up and running."
            icon={UserRound}
          />
        </div>
        <div className="">
          <GuidianceCard
            header="Get A Referal"
            caption="Using your unique refferal link , invite others to start earning."
            icon={Settings2}
          />
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <GuidianceCard
            header="Enjoy our App"
            caption="Also get bonuses on ref circle completion"
            icon={Handshake}
          />
        </div>
      </div>
    </ContainerLayout>
  );
};
