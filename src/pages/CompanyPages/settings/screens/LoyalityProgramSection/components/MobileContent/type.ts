export interface ICheck {
  type: "discount" | "cashback" | "bonuspoint" | "";
  checked: boolean;
}

export interface IProps {
  control: any;
  index: any;
}

export interface ISetting {
  type: "cashback" | "other";
  open: boolean;
}
