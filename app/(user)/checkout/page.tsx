import { logout } from "@/actions/logout";
import Checkout from "@/components/checkout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { purchase } from "@/lib/auth";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";

const SettingsPage = async () => {
  const userPurchase = await purchase();

  if (userPurchase) redirect("/dashboard");

  return <Checkout />;
};

export default SettingsPage;
