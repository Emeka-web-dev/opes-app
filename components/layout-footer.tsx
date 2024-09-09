import { Whatsapp } from "iconsax-react";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";

const socials = [
  "https://www.instagram.com/prestmit/",
  "https://x.com/prestmit/",
];
export const LayoutFooter = () => {
  return (
    <footer className="bg-[#12033c] text-white">
      <div className="max-w-7xl mx-auto px-3 py-6 gap-y-6 flex flex-col">
        <div className="grid grid-cols-6 gap-y-5 md:gap-y-0">
          <div className="col-span-6 md:col-span-2">
            <Image
              src="/images/logo-icon-white.png"
              alt="logo image"
              height={50}
              width={50}
              className=""
            />
          </div>
          <div className="col-span-3 md:col-span-2 flex flex-col gap-y-1">
            <h5 className="font-semibold text-md pb-1">Contact us</h5>
            <div className="flex items-center text-xs md:text-sm font-light">
              <Whatsapp className="size-4 mr-2" />
              +2349162475091
            </div>
            <div className="flex items-center text-xs md:text-sm font-light">
              <Mail className="size-4 mr-2" />
              <Link href="mailto:franklinemmanuel30@gmail.com" className="">
                help@prestmit.com
              </Link>
            </div>
          </div>
          <div className="col-span-3 md:col-span-2 flex flex-col gap-y-1">
            <h5 className="font-semibold text-md pb-1">Useful Link</h5>
            <Link className="text-xs md:text-sm" href="/about">
              About
            </Link>
            <Link className="text-xs md:text-sm" href="/privacy-policy">
              Privacy Policy
            </Link>
          </div>
        </div>
        <hr />
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-2">
          <Link
            target="_blank"
            href="https://emeka-resume-kula.vercel.app"
            className="text-gray-400 text-xs md:text-sm"
          >
            © 2024 Spotex Media LLC
          </Link>
          <div className="flex gap-x-2 md:pr-12">
            {socials.map((data, i) => (
              <SocialIcon
                url={data}
                key={i}
                style={{
                  width: "1.6rem",
                  height: "1.6rem",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
