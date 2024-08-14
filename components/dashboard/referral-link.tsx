"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Check, Copy } from "lucide-react";

type ReferralLinkProps = {
  refLink: string | null | undefined;
};
export const urlLink = (refCode: string) =>
  `${process.env.NEXT_PUBLIC_SITE_URL!}?ref=${refCode}`;
export const ReferralLink = ({ refLink }: ReferralLinkProps) => {
  const [copied, setCopied] = useState(false);
  const link = urlLink(refLink || "empty");
  const onCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="p-4 bg-white dark:bg-background flex flex-col space-y-1 h-full rounded-lg shadow-lg">
      <h3 className="text-foreground">Your Referral Link</h3>
      <div className="flex items-center mt-2 gap-x-2">
        <Input
          className=" border border-[#9772fc] bg-[#9772fc]/20 dark:bg-[#9772fc]/10 focus-visible:ring-0 text-black dark:text-foreground focus-visible:ring-offset-0 h-full"
          value={link}
        />
        <Button
          onClick={onCopy}
          size="icon"
          className="bg-[#9772fc] dark:bg-[#020817] dark:text-white"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
      </div>
    </div>
  );
};
