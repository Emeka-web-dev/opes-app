const generateReferralLink = (refLink: any): string => {
  return `${process.env.BASE_URL!}/?ref=${refLink}`;
};
