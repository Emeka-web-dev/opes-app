import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export const Banner = () => {
  return (
    <div className="mx-4 my-2 bg-gradient-to-r from-[#fceefe] dark:from-[#0a132f] rounded-xl to-[#e6f2fe] dark:to-[#383b53]">
      <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 lg:grid-cols-2 space-y-20 lg:space-y-0">
        <div className="space-y-7 px-5 flex flex-col lg:justify-center lg:items-start">
          <h2 className="text-4xl lg:text-5xl font-semibold">
            Welcome to the{" "}
            <span className="block font-extrabold">Referral App</span>
          </h2>
          <p className="text-gray-700 dark:text-white">
            Lorem ipsum dolor sit amet, consec adipiscing elit In vulputate
            vitae massa eu dapibus ligula.
          </p>
        </div>
        <div className="flex justify-center items-center relative  lg:pb-0 ">
          <div className="absolute w-[400px] h-[400px] rounded-full dark:bg-[#343754] bg-[#f0f3fd] a30" />
          <div className="absolute w-[300px] h-[300px] rounded-full dark:bg-[#272a48] bg-[#f3f8fe] a30" />
          <div className="z-20">
            <Image
              src="/images/hero-image-2.svg"
              alt="hero image"
              width={250}
              height={250}
            />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
