import { LayoutProvider } from "@/components/providers/layout-provider";
import React from "react";

const NotFoundPage = () => {
  return (
    <LayoutProvider>
      <div className="h-full px-4 flex flex-col items-center justify-center gap-y-2">
        <h2 className="text-3xl font-bold">Page Not found</h2>
        <p>Looks like this page doesn&apos;t exist.</p>
      </div>
    </LayoutProvider>
  );
};

export default NotFoundPage;
