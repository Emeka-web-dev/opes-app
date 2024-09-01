export type EarningHistory = {
  amount: number;
  createdAt: Date;
};

export type BankData = {
  name: string;
  code: number;
};

export type WithdrawalData = {
  bankDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
  earnings: number;
  withdrawableEarnings: number;
};
