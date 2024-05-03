import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

type Props = {
  label: string;
};

export const Header = ({ label }: Props) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-3">
      <h1 className={cn("text-3xl font-semibold", font.className)}>Opec</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
