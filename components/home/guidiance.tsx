import React from "react";
import { ContainerLayout } from "./container-layout";
import { GuidianceCard } from "./guidiance-card";
import { UserRound } from "lucide-react";

export const Guidiance = () => {
  return (
    <ContainerLayout
      header="How it Works"
      caption="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-4 gap-y-6">
        <div className="">
          <GuidianceCard
            header="Open an Account"
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit lectus non ipsum."
            icon={UserRound}
          />
        </div>
        <div className="">
          <GuidianceCard
            header="Get A Referal"
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit lectus non ipsum."
            icon={UserRound}
          />
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <GuidianceCard
            header="Enjoy our App"
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit lectus non ipsum."
            icon={UserRound}
          />
        </div>
      </div>
    </ContainerLayout>
  );
};
