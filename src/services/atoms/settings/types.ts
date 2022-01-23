export interface IBaseLoyality {
  max_percent?: number | string;
  give_cashback_after?: number | string;
  base_percent?: number | string;
  base_name?: string;
}

export interface ILoyality {
  useProgram: boolean;
  usePoint: boolean;
}

export interface IActive {
  active: "discount" | "cashback" | "bonuspoint" |"";
}

export interface IECashback {
  type: "cashback" | any;
  empty: boolean;
}

export interface IEDiscount {
  type: "discount";
  empty: boolean;
}

export interface IEBonuspoint {
  type: "bonuspoint";
  empty: boolean;
}
