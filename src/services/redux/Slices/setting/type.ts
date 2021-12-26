export interface ISecurty {
  companyId?: number;
  isEnabledPaySumLimit: boolean;
  isEnabledPurchaseLimit: boolean;
  safeties?: { daily_purchase_limit?: number; pay_sum_limit?: number };
}

export interface ILevels {}

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
