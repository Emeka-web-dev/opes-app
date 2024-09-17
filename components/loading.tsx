import { Loader2 } from "lucide-react";

export const Loading = () => {
  return (
    <div className="h-full w-full pt-[-4.5rem] flex items-center justify-center">
      <Loader2 className="size-20 text-[#230672] animate-spin" />
    </div>
  );
};
