"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useModal } from "@/hooks/useModalStore";
import { NavigationRef } from "../navigation/navigation-ref";

export default function MobileToggleProvider() {
  const { isOpen, onClose, type } = useModal();

  const isSidebarOpen = isOpen && type === "openMobileToggle";

  return (
    <Sheet open={isSidebarOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col pt-10 px-5" side={"right"}>
        <NavigationRef />
      </SheetContent>
    </Sheet>
  );
}
