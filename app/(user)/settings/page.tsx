"use client";
import { urlLink } from "@/components/dashboard/referral-link";
import { useSessionStore } from "@/hooks/useSessionStore";
import {
  BadgeCheck,
  Box,
  Check,
  ChevronRight,
  Copy,
  ListChecks,
  Lock,
  LucideIcon,
  Power,
  UserCog,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

type LinksProps = {
  name: string;
  icon: LucideIcon;
  link: string;
};

const links: LinksProps[] = [
  {
    name: "Withdraw",
    icon: Box,
    link: "/withdraw",
  },
  {
    name: "Payment History",
    icon: ListChecks,
    link: "/payment-history",
  },
  {
    name: "Edit Profile",
    icon: UserCog,
    link: "/settings/profile",
  },
  {
    name: "Update Profile",
    icon: Lock,
    link: "/settings/password",
  },
  {
    name: "Update Bank Details",
    icon: BadgeCheck,
    link: "/settings/bank",
  },
  {
    name: "Logout",
    icon: Power,
    link: "/logout",
  },
];
const SettingsPage = () => {
  const user = useSessionStore((state) => state.session)?.user;
  const [copied, setCopied] = useState(false);
  const refLink = urlLink(user?.invitationCode || "empty");

  const onCopy = () => {
    navigator.clipboard.writeText(refLink);
    toast.success("Link Copied");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col bg-white">
      {/* user */}
      <div className="p-4 items-center space-x-4 border-b flex">
        <div className="relative h-12 w-12">
          <Image
            src="/images/image-logo.jpg"
            fill
            className="rounded-full border"
            alt=""
          />
        </div>

        <div className="flex flex-col">
          <h5 className="text-muted-foreground font-semibold text-sm">
            {user?.email}
          </h5>
          <h4 className="font-medium">{user?.name}</h4>
          <span className="font-semibold text-sm text-[#9772fc] flex space-x-2 items-center">
            <h5>{user?.invitationCode}</h5>
            <div className="cursor-pointer" onClick={onCopy}>
              {copied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
            </div>
          </span>
        </div>
      </div>
      {/* link */}
      {links.map(({ icon: Icon, name, link }) => (
        <Link
          href={link}
          className="border-b px-2 py-4 text-muted-foreground hover:bg-[#fafafa] hover:text-[#9772fc] flex items-center justify-between"
          key={link}
        >
          <span className="flex space-x-2 items-center">
            <Icon className="size-4" />
            <p>{name}</p>
          </span>
          <ChevronRight className="size-4" />
        </Link>
      ))}
    </div>
  );
};

export default SettingsPage;
