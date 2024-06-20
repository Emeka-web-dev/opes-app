type ReferralLinkProps = {
  refLink: string | null | undefined;
};
export const ReferralLink = ({ refLink }: ReferralLinkProps) => {
  const link = `${process.env.NEXT_PUBLIC_SITE_URL!}?ref=${refLink}`;
  return <div>{link}</div>;
};
