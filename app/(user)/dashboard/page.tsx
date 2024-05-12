"use client";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import React from "react";

const DashboardPage = () => {
  const signOut = () => {
    logout();
  };
  return (
    <div>
      DashboardPage
      <Button onClick={signOut}>Signout</Button>
    </div>
  );
};

export default DashboardPage;
