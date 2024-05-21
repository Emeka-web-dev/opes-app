"use client";
import Link from "next/link";
import { ModeToggle } from "../home/modal-toggle";
import { Button } from "../ui/button";
import { NavigationRef } from "./navigation-ref";
import { MobileToggle } from "../home/mobile-toggle";
import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { NavbarDropDownMenu } from "../navbar-dropDownMenu";
import { useEffect } from "react";

export const NavigationItems = () => {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);

  const user = useCurrentUser();
  const pathName = usePathname();
  const scrollTop = useScrollTop();
  const isAuthRoute = pathName.startsWith("/auth");
  return (
    <header
      className={cn(
        "fixed h-[3.8rem] md:h-[4.5rem] top-0 w-screen z-50 bg-white/80 dark:bg-[#1d2144]/80 backdrop-blur-lg flex items-center",
        isAuthRoute && "shadow-md",
        scrollTop && "shadow-md"
      )}
    >
      <div className="px-4 flex items-center justify-between w-full max-w-7xl mx-auto">
        <Link href="/">OPES</Link>
        <div className="flex items-center space-x-28">
          {pathName === "/" && (
            <div className=" space-x-14 hidden md:flex">
              <NavigationRef />
            </div>
          )}
          <div className="flex items-center space-x-4">
            {user ? (
              <NavbarDropDownMenu user={user} />
            ) : (
              <Button>
                <Link
                  href={
                    pathName.startsWith("/auth/login")
                      ? "/auth/signup"
                      : "/auth/login"
                  }
                >
                  {pathName.startsWith("/auth/login") ? "Signup" : "Login"}
                </Link>
              </Button>
            )}

            <ModeToggle />
            {pathName === "/" && <MobileToggle />}
          </div>
        </div>
      </div>
    </header>
  );
};
