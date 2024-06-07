import { Checkout } from "@/components/checkout";
import { currentUser, purchase } from "@/lib/auth";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const user = await currentUser();

  if (user?.isSubscribed) {
    return redirect("/dashboard");
  }

  return <Checkout user={user} />;
};

export default SettingsPage;
