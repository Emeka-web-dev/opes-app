"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useModal } from "@/hooks/useModalStore";

import { AdminSidebar } from "../admin/admin-sidebar";

export default function SideBarToggle() {
  const { isOpen, onClose, type } = useModal();

  const isSidebarOpen = isOpen && type === "openAdminNavigation";

  return (
    <Sheet open={isSidebarOpen} onOpenChange={onClose}>
      <SheetContent className="" side={"left"}>
        <AdminSidebar />
      </SheetContent>
    </Sheet>
  );
}
