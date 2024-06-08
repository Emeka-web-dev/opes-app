type ReferralLinkProps = {
  refLink: string | null | undefined;
};
export const ReferralLink = ({ refLink }: ReferralLinkProps) => {
  const link = `${process.env.BASE_URL!}/?ref=${refLink}`;
  return <div>{link}</div>;
};
