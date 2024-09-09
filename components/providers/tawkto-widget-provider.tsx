// "use client";
// import React, { useEffect } from "react";
// import Intercom from "@intercom/messenger-js-sdk";

// const IntercomMessenger = () => {
//   useEffect(() => {
//     // Check if window is defined (Client-side)
//     if (typeof window !== "undefined") {
//       Intercom({
//         app_id: "dirutfql", // Replace with your Intercom app ID
//         user_id: Math.random().toString(), // User's ID from your system
//         name: "emeka", // User's name
//         email: "emekarexchukwu@gmail.com", // User's email
//         created_at: Math.floor(new Date().getTime() / 1000), // User's signup date as a Unix timestamp (seconds)
//       });
//     }

//     // Optionally return a cleanup function to shut down Intercom on unmount
//     return () => {
//       if (typeof window.Intercom !== "undefined") {
//         window.Intercom("shutdown");
//       }
//     };
//   }, []);

//   return <div></div>;
// };

// export default IntercomMessenger;

// components/TawkToWidget.js
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
    // window.Tawk_API?.shutdown();

    return () => {
      document.body.removeChild(tawkScript);
    };
  }, []);

  return null;
};

export default TawkToWidget;
