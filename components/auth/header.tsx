import { Poppins } from "next/font/google";

import Image from "next/image";

type Props = {
  label: string;
};

export const Header = ({ label }: Props) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-1">
      <Image
        src="/images/logo-icon.png"
        alt="logo icon"
        height={50}
        width={50}
      />
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
