import { Balance } from "@/components/dashboard/balance";
import { ReferralLink } from "@/components/dashboard/referral-link";
import { UserContainter } from "@/components/dashboard/user-dashboard-container";

const DashboardPage = () => {
  return (
    <div className="">
      <UserContainter left={<Balance />} right={<ReferralLink />} />
    </div>
  );
};

export default DashboardPage;
