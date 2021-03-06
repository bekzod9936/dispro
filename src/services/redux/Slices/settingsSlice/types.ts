export interface IBaseLoyality {
  max_percent?: number | string;
  give_cashback_after?: number | string;
  base_percent?: number | string;
  base_name?: string;
}

export interface IOpenState {
  type: "cashback" | "bonuspoint" | "discount";
  open: boolean;
}

export interface IToggle {
  name: "discount" | "cashback" | "bonuspoint" | "";
}
