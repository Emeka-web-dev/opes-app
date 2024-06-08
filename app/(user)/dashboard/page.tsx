import { Balance } from "@/components/dashboard/balance";
import { ReferralLink } from "@/components/dashboard/referral-link";
import { UserContainter } from "@/components/dashboard/user-dashboard-container";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

export const revalidate = 0;
const DashboardPage = async () => {
  const user = await currentUser();
  const userInfo = await getUserById(user?.id!);

  return (
    <div className="">
      <UserContainter
        left={<Balance earning={userInfo?.earnings} />}
        right={<ReferralLink refLink={userInfo?.invitationCode} />}
      />
    </div>
  );
};

export default DashboardPage;
