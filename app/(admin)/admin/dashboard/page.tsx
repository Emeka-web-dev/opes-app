"use client";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import React from "react";

const AdminDashboardPage = () => {
  const signOut = async () => {
    await logout();
    window.location.reload();
  };
  return (
    <div>
      <Button onClick={signOut}>Logout</Button>
    </div>
  );
};

export default AdminDashboardPage;
