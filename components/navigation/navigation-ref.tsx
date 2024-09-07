"use client";
import { useModal } from "@/hooks/useModalStore";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const navItems = [
  {
    name: "About",
    ref: "/about",
  },
  {
    name: "Terms of Use",
    ref: "/terms-of-use",
  },
  {
    name: "Privacy Policy",
    ref: "/privacy-policy",
  },
  // {
  //   name: "Contact",
  //   ref: "#contact",
  // },
];
export const NavigationRef = () => {
  const pathname = usePathname();
  const { onClose } = useModal();

  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.ref}
          onClick={onClose}
          className={cn(
            "hover:text-[#8b5cf6]",
            pathname === item.ref && "text-[#8b5cf6] underline md:no-underline"
          )}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
};
