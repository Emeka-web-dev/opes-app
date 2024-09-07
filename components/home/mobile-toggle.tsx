import { Menu } from "lucide-react";
import React from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { NavigationRef } from "../navigation/navigation-ref";

export const MobileToggle = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col pt-10 px-5" side="right">
        <NavigationRef />
      </SheetContent>
    </Sheet>
  );
};
