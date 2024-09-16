"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export const Banner = () => {
  return (
    <div className="mx-4 my-2 bg-gradient-to-r from-[#fceefe] dark:from-[#0a132f] rounded-xl to-[#e6f2fe] dark:to-[#383b53]">
      <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 lg:grid-cols-2 space-y-12 lg:space-y-0">
        <div className="space-y-8 px-5 flex flex-col lg:justify-center lg:items-start">
          <motion.h2
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [30, -5, 0], opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.3,
            }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-semibold"
          >
            Welcome to <span className="block font-extrabold">Opes Tech</span>
          </motion.h2>
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [30, -5, 0], opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.4,
            }}
            viewport={{ once: true }}
            className="flex flex-col space-y-8"
          >
            <p className="text-gray-700 dark:text-white lg:text-2xl">
              The <span className="font-semibold">#1</span> earning platform, we
              provide you with an opportunity to generate significant income
              using our matrix system.
            </p>
            <Link href="/auth/signup" className="hidden lg:flex">
              <Button size="lg" className="text-lg">
                Signup now
              </Button>
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ y: -5, opacity: 0 }}
          animate={{ scale: [0.6, 1.05, 0.98, 1], y: 0, opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.7,
          }}
          viewport={{ once: true }}
          className="flex justify-center items-center relative  lg:pb-0 "
        >
          <div className="absolute w-[400px] h-[400px] rounded-full dark:bg-[#343754] bg-[#f0f3fd] a30" />
          <div className="absolute w-[300px] h-[300px] rounded-full dark:bg-[#272a48] bg-[#f3f8fe] a30" />
          <div className="z-20">
            <Image
              src="/images/samsung-image.png"
              alt="hero image"
              width={250}
              height={250}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
