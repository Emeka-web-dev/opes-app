"use client";
import { useModal } from "@/hooks/useModalStore";
import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarDropDownMenu } from "../navbar-dropDownMenu";
import { Button } from "../ui/button";
import { NavigationRef } from "./navigation-ref";

export const NavigationItems = ({ user }: any) => {
  const { onOpen } = useModal();

  const pathName = usePathname();
  const scrollTop = useScrollTop();
  const isHomeRoute = pathName === "/";
  return (
    <header
      className={cn(
        "fixed h-[3.8rem] md:h-[4.5rem] top-0 w-screen shadow-md z-50 bg-white/80 dark:bg-background/80 backdrop-blur-lg flex items-center",
        isHomeRoute && "shadow-none",
        scrollTop && "shadow-md"
      )}
    >
      <div className="px-4 flex items-center justify-between w-full max-w-7xl mx-2">
        <Link href="/">OPES</Link>
        <div className="flex items-center space-x-28">
          {!pathName?.startsWith("/auth") && (
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
                    pathName?.startsWith("/auth/login")
                      ? "/auth/signup"
                      : "/auth/login"
                  }
                >
                  {pathName?.startsWith("/auth/login") ? "Signup" : "Login"}
                </Link>
              </Button>
            )}

            {/* <ModeToggle /> */}
            {!pathName?.startsWith("/auth") && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => onOpen("openMobileToggle")}
              >
                <Menu className="size-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
