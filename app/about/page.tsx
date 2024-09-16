"use client";
import { LayoutProvider } from "@/components/providers/layout-provider";
import React, { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    // window.Tawk_API = window.Tawk_API || {};
    // window.Tawk_API.autoStart = false;
  }, []);
  return (
    <LayoutProvider>
      <div className="max-w-6xl mx-auto px-2">about page</div>
    </LayoutProvider>
  );
};

export default AboutPage;
