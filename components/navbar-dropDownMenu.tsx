"use client";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
import { logout } from "@/actions/logout";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";

type NavbarDropProps = {
  user: any;
};
export const NavbarDropDownMenu = ({ user }: NavbarDropProps) => {
  const router = useRouter();

  const nameAbrev = user?.name?.split("").splice(0, 2).join("");

  const signOut = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          asChild
          variant={"outline"}
          size={"none"}
          className="rounded-full"
        >
          <span className="flex space-x-2">
            <Avatar className="size-8">
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback className="uppercase">{nameAbrev}</AvatarFallback>
            </Avatar>

            <div className="xl:flex flex-col justify-end hidden">
              <span>{user.name}</span>
              <span className="line-clamp-1 text-xs text-gray-600">
                {user?.email}
              </span>
            </div>
            <div>
              <ChevronDown className="w-4 h-4" />
            </div>
          </span>
        </Button>
        {/* <Button>open</Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
