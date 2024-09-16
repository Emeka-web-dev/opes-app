"use client";

import { useEffect } from "react";

const TawkToWidget = () => {
  useEffect(() => {
    const tawkScript = document.createElement("script");
    tawkScript.src = process.env.NEXT_PUBLIC_TAWKTO_URL as string;
    tawkScript.async = true;
    tawkScript.charset = "UTF-8";
    tawkScript.setAttribute("crossorigin", "*");
    document.body.appendChild(tawkScript);

    return () => {
      document.body.removeChild(tawkScript);
    };
  }, []);

  return null;
};

export default TawkToWidget;
