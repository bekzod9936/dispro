export interface ISecurty {
  companyId?: number;
  isEnabledPaySumLimit: boolean;
  isEnabledPurchaseLimit: boolean;
  safeties?: { daily_purchase_limit?: number; pay_sum_limit?: number };
}
