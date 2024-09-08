import React from "react";
import { ContainerLayout } from "./container-layout";
import { PricingContainer } from "./pricing-container";
import Image from "next/image";
import { PaymentPlan as Tier } from "@prisma/client";

export const Pricing = () => {
  return (
    <div className="max-w-7xl mx-auto relative overflow-hidden">
      <ContainerLayout
        header="Flexible Plans"
        caption="Choose your preferred plan to enjoy exclusive benefits of each plan."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4">
          <PricingContainer
            name="Basic Plan"
            amount="2,000"
            url={`/checkout?plan=${Tier.BASIC}`}
            points={[
              "Earn from 3 levels of refferal",
              "+₦5,000 completion bonus",
            ]}
          />
          <PricingContainer
            name="Starter Plan"
            amount="5,000"
            url={`/checkout?plan=${Tier.POPULAR}`}
            points={[
              "Earn from 4 levels of refferal",
              "+₦10,000 completion bonus",
            ]}
          />
          <PricingContainer
            name="Advanced Plan"
            amount="10,000"
            url={`/checkout?plan=${Tier.GOLDEN}`}
            points={[
              "Earn from 5 levels of refferal ",
              "+₦50,000 completion bonus",
            ]}
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
