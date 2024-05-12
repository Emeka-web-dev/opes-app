import Checkout from "@/components/checkout";
import { purchase } from "@/lib/auth";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const userPurchase = await purchase();

  if (userPurchase) redirect("/dashboard");

  return <Checkout />;
};

export default SettingsPage;
