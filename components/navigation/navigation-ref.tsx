import Link from "next/link";
import React from "react";

export const navItems = [
  {
    name: "About",
    ref: "#about",
  },
  {
    name: "Pricing",
    ref: "#pricing",
  },
  {
    name: "FAQ",
    ref: "#faq",
  },
  {
    name: "Contact",
    ref: "#contact",
  },
];
export const NavigationRef = () => {
  return (
    <>
      {navItems.map((item) => (
        <Link key={item.name} href={item.ref} className="hover:text-[#8b5cf6]">
          {item.name}
        </Link>
      ))}
    </>
  );
};
