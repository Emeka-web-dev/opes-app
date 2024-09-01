"use client";
import { Banner } from "@/components/home/banner";
import { Contact } from "@/components/home/contact";
import { Faq } from "@/components/home/faq";
import { Guidiance } from "@/components/home/guidiance";
import { Pricing } from "@/components/home/pricing";
import { Navbar } from "@/components/navbar";
import { NavigationItems } from "@/components/navigation";
import { useSessionStore } from "@/hooks/useSessionStore";
import { redirect } from "next/navigation";

export default function Home() {
  const user = useSessionStore((state) => state.session);

  if (user?.user?.paymentPlan) {
    return redirect("/checkout");
  }
  return (
    <main className="scroll-smooth overflow-x-hidden">
      <NavigationItems user={user?.user} />
      <div className="pt-[4.5rem]">
        <section className="max-w-7xl mx-auto">
          <Banner />
        </section>

        <section className="max-w-7xl mx-auto">
          <Guidiance />
        </section>

        <section id="pricing" className="">
          <Pricing />
        </section>

        <section id="faq" className="bg-[#e4f2fe] dark:bg-[#030c21] ">
          <Faq />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </div>
      {/* <Footer /> */}
    </main>
  );
}
