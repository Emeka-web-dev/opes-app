"use client";
import { useModal } from "@/hooks/useModalStore";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navItems = [
  {
    name: "Home",
    ref: "/",
  },
  {
    name: "About",
    ref: "/about",
  },
  {
    name: "Privacy Policy",
    ref: "/privacy-policy",
  },
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
