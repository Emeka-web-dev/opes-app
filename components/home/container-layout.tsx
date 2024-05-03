import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  header: string;
  caption: string;
}
export const ContainerLayout = ({
  children,
  header,
  caption,
}: ContainerProps) => {
  return (
    <div className="py-10 px-4 flex flex-col space-y-5">
      <div className="flex flex-col items-center justify-center text-center space-y-5">
        <h3 className="text-3xl font-bold">{header}</h3>
        <p className="max-w-[34rem] text-gray-700 dark:text-white/50">
          {caption}
        </p>
      </div>
      <div className="pt-4">{children}</div>
    </div>
  );
};
