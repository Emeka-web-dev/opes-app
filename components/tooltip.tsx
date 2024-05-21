"use client";

type TooltipProps = {
  name: string;
  children: React.ReactNode;
};

export const Tooltip = ({ name, children, ...others }: TooltipProps) => {
  return (
    <div className="w-full relative group flex justify-center items-center">
      <div className="w-full">{children}</div>
      <div className="absolute ml-2 left-[100%] hidden lg:group-hover:flex z-50">
        <p className="border bg-gray-700 text-white px-2 rounded-lg">{name}</p>
      </div>
    </div>
  );
};
