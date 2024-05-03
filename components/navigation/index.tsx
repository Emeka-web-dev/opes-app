import Link from "next/link";
import { ModeToggle } from "../home/modal-toggle";
import { Button } from "../ui/button";
import { NavigationRef } from "./navigation-ref";
import { MobileToggle } from "../home/mobile-toggle";

export const NavigationItems = () => {
  return (
    <header className="fixed h-[4.5rem] top-0 w-full z-50 bg-white/80 dark:bg-[#1d2144]/80 backdrop-blur-lg">
      <div className="py-3 px-4 flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/">OPES</Link>
        <div className="flex items-center space-x-28">
          <div className=" space-x-14 hidden md:flex">
            <NavigationRef />
          </div>
          <div className="flex items-center space-x-4">
            <Button>
              <Link href="/auth/login">Login</Link>
            </Button>
            <ModeToggle />
            <MobileToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
