import { Banner } from "@/components/home/banner";
import { Contact } from "@/components/home/contact";
import { Faq } from "@/components/home/faq";
import { Guidiance } from "@/components/home/guidiance";
import { Pricing } from "@/components/home/pricing";
import { NavigationItems } from "@/components/navigation";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  if (user?.paymentPlan) {
    redirect("/checkout");
  }
  return (
    <main className="scroll-smooth overflow-x-hidden dark:bg-[#1d2144]">
      <NavigationItems user={user} />
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

        <section id="faq" className="bg-[#e4f2fe] dark:bg-[#07102d] ">
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
