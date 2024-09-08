import React from "react";
import { ContainerLayout } from "./container-layout";
import { Contactform } from "./contact-form";
import Image from "next/image";

export const Contact = () => {
  return (
    <ContainerLayout
      header="Need Any Help?"
      caption="For enquiries and further assistance kindly fill in the form below or contact support."
    >
      <div className="relative">
        <Contactform />
        <div className="absolute max-w-3xl mx-auto inset-0 -z-10">
          <Image
            src="/images/blob.svg"
            alt="hero image"
            width={150}
            height={150}
            className="absolute -top-16 -left-16 rotate-180 -z-40"
          />
          <Image
            src="/images/blob.svg"
            alt="hero image"
            width={150}
            height={150}
            className="absolute bottom-12 -right-16 -z-40"
          />
        </div>
      </div>
    </ContainerLayout>
  );
};
