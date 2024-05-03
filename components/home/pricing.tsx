import React from "react";
import { ContainerLayout } from "./container-layout";
import { PricingContainer } from "./pricing-container";
import Image from "next/image";

export const Pricing = () => {
  return (
    <div className="max-w-7xl mx-auto relative overflow-hidden">
      <ContainerLayout
        header="Flexible Plans"
        caption="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4">
          <PricingContainer
            name="Basic Plan"
            amount="2000"
            points={["Life time free updates!", "Unlimited transactions"]}
          />
          <PricingContainer
            name="Popular Plan"
            amount="3000"
            points={["Life time free updates!", "Unlimited transactions"]}
          />
          <PricingContainer
            name="Goldern Plan"
            amount="5000"
            points={["Life time free updates!", "Unlimited transactions"]}
          />
        </div>
      </ContainerLayout>
      <Image
        src="/images/blob.svg"
        alt="hero image"
        width={150}
        height={150}
        className="absolute top-28 -left-4 rotate-180 -z-40"
      />
    </div>
  );
};
