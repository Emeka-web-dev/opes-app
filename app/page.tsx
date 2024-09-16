import { Banner } from "@/components/home/banner";
import { Contact } from "@/components/home/contact";
import { Faq } from "@/components/home/faq";
import { Guidiance } from "@/components/home/guidiance";
import { Pricing } from "@/components/home/pricing";
import { LayoutProvider } from "@/components/providers/layout-provider";

export default function Home() {
  return (
    <LayoutProvider>
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
      {/* remove contact components */}
    </LayoutProvider>
  );
}
