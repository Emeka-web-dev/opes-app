"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { useSessionStore } from "@/hooks/useSessionStore";

import React, { useEffect } from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const session = useSessionStore((state) => state.session);
  const router = useRouter();
  useEffect(() => {
    window.Tawk_API = window.Tawk_API || {};
    if (window.Tawk_API.hideWidget) {
      window.Tawk_API?.hideWidget();
    }
    window.Tawk_API.onLoad = function () {
      if (typeof window.Tawk_API?.hideWidget === "function") {
        window.Tawk_API?.hideWidget();
      }
    };
  }, [router]);

  if (session?.user && !session?.user?.isSubscribed) {
    return router.push("/");
  }
  return (
    <div className="flex min-h-screen relative dark:bg-[#020817]">
      {/* sidebar */}
      <div className="w-[70px] z-30 fixed inset-y-0 left-0  h-full border-r hidden lg:block">
        <Sidebar />
      </div>

      {/* main */}
      <main className="flex-1 relative lg:ml-[70px]">
        <div className="border-b h-[3.5rem] flex items-center fixed top-0 inset-x-0  z-40 bg-background dark:bg-[#020817]">
          <Navbar />
        </div>
        <div className="bg-[#fafafa] dark:bg-inherit h-full pt-[3.5rem] max-lg:pb-[3rem]">
          <div className="max-w-6xl mx-auto h-full">{children}</div>
        </div>
        <div className="lg:hidden fixed bottom-0 inset-x-0 border-t h-[3rem] flex items-center bg-background">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
