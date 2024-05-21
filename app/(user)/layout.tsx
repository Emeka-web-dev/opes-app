import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen relative">
      {/* sidebar */}
      <div className="w-[70px] z-50 fixed inset-y-0 left-0  h-full border-r hidden lg:block">
        <Sidebar />
      </div>

      {/* main */}
      <main className="flex-1 relative lg:ml-[70px]">
        <div className="border-b h-[3.5rem] flex items-center fixed top-0 inset-x-0  z-50 bg-background">
          <Navbar />
        </div>
        <div className="bg-[#fafafa] dark:bg-inherit h-full pt-[3.5rem]">
          <div className="max-w-6xl mx-auto">{children}</div>
        </div>
        <div className="lg:hidden fixed bottom-0 inset-x-0 border-t h-[3rem] flex items-center">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
