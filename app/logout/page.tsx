"use client";
import { logout } from "@/actions/logout";
import React, { useEffect } from "react";

const LogoutPage = () => {
  useEffect(() => {
    const signOut = async () => {
      await logout();
      window.location.reload();
    };
    signOut();
  }, []);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 pt-[-3.5rem]">
        <span className="loader"></span>
        <h5 className="text-base font-semibold uppercase text-center text-primary">
          Logging out
        </h5>
      </div>
    </div>
  );
};

export default LogoutPage;
