"use client";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
// import SideBarToggle from "@/components/admin/sidebar-toggle";
import { useSessionStore } from "@/hooks/useSessionStore";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const session = useSessionStore((state) => state.session);
  const toggle = useModal((state) => state.onOpen);
  const router = useRouter();
  if (session?.user && session?.user?.role !== ("ADMIN" || "MODERATOR")) {
    return router.push("/");
  }
  return (
    <div className="min-h-screen h-screen relative bg-[#fdfdfd]">
      <div className="w-[70px] z-50 fixed top-0 left-0 bottom-0 h-screen border-r hidden lg:block">
        <AdminSidebar />
      </div>
      {/* main */}
      <main className="flex-1 relative lg:ml-[70px]">
        <div className="border-b py-2 px-1 sticky top-0 left-0 z-50 bg-background flex items-center">
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => toggle("openAdminNavigation")}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <Navbar />
        </div>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
