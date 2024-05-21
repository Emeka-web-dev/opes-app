"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Switch } from "./ui/switch";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { setTheme, theme } = useTheme();
  const Icon = theme === "light" ? Sun : Moon;
  const toggleHandler = () => {
    if (theme === "dark") setTheme("light");
    if (theme === "light") setTheme("dark");
  };

  if (!isMounted) return;
  return (
    <Button
      variant={"outline"}
      className="rounded-full p-2 dark:bg-[#1d2144]"
      onClick={toggleHandler}
    >
      <Icon className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
}
