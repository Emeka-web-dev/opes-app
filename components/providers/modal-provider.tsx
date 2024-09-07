"use client";

import { useEffect, useState } from "react";
import { CreateOrUpdateBankDetails } from "../modals/create-or-update-bank-details";
import SideBarToggle from "./admin-sidebar-provider";
import MobileToggleProvider from "./mobile-toggle-provider";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;
  return (
    <>
      <CreateOrUpdateBankDetails />
      <SideBarToggle />
      <MobileToggleProvider />
    </>
  );
};
