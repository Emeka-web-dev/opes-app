"use client";
import { GuidianceCard } from "@/components/home/guidiance-card";
import { LayoutProvider } from "@/components/providers/layout-provider";
import { motion } from "framer-motion";
import { Eye, HeartHandshake, Target } from "lucide-react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <LayoutProvider>
      <div className="flex flex-col p-2 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 ">
          <div className="col-span-2 lg:col-span-1 text-center lg:text-left flex flex-col gap-y-2 justify-center">
            <h2 className="p-4 text-4xl font-bold capitalize">about us</h2>
            <p>
              Earn daily income of up to ₦5,000 by following, liking,
              commenting, sharing, retweeting or posting adverts for businesses
              on your social media.
            </p>
            <p>
              Earn an Instant Referral Commission of ₦500 when you refer someone
              to become a member on Hawkit. The more you refer, the more you
              earn.
            </p>
            <p>
              Sell Faster on Hawkit. Let your products be seen by thousands of
              buyers and resellers daily.
            </p>
            <p>
              Start Your Airtime/Data Business on Hawkit. Buy Airtime or Data on
              Hawkit at up to 10% - 50% Discount and Sell to friends and family
              at normal prices.
            </p>
          </div>
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [30, -5, 0], opacity: 1 }}
            transition={{
              duration: 0.7,
            }}
            viewport={{ once: true }}
            className="col-span-2 lg:col-span-1 flex items-center justify-center py-4"
          >
            <Image
              src="/images/samsung-image2.png"
              alt="samsung image"
              height={200}
              width={200}
            />
          </motion.div>
        </div>
        <div className="text-center max-w-3xl mx-auto gap-y-2 my-6">
          <h3 className="text-3xl font-bold capitalize">Who we are</h3>
          <p>
            Hawkit is a platform developed by Tech Champions Services, a Web and
            Mobile App Development Company located in Lagos. With Hawkit, you
            can easily advertise your products and services and also earn daily
            income by reposting adverts on your social media accounts
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:space-x-4 gap-y-6 my-6">
          <GuidianceCard
            header="Our Vision"
            caption="To become the largest online earning platform through our income generating system."
            icon={Eye}
          />
          <GuidianceCard
            header="Our Mission"
            caption="To help create wealth, alleviate poverty and to provide an equal earning opportunity to all."
            icon={Target}
          />
          <GuidianceCard
            header="Our Values"
            caption="Our values define our culture and they are captured in the name OPES which 'wealth'"
            icon={HeartHandshake}
          />
        </div>
      </div>
    </LayoutProvider>
  );
};

export default AboutPage;
