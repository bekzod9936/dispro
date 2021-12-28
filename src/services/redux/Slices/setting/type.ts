export interface ISecurty {
  companyId?: number;
  isEnabledPaySumLimit: boolean;
  isEnabledPurchaseLimit: boolean;
  safeties?: { daily_purchase_limit?: number; pay_sum_limit?: number };
}

export interface IRewards {
  amount?: number;
  companyId?: number;
  isActive?: boolean;
  rewardType?: number;
  userType?: number;
  levels?: any[];
}

export interface IReward {
  companyId?: number;
  rewards?: IRewards[];
}

export interface IRefQrcodes {
  companyId?: number;
  dynLinkToken?: string;
  id?: number;
  referType?: number;
  source?: string;
  token?: string;
  userId?: number;
}

export interface IBranchQrcodes {
  active: boolean;
  companyId: number;
  dynLink: string;
  id: number;
  name: string;
  qrCode: string;
}
