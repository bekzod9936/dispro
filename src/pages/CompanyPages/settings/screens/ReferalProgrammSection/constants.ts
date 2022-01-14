export interface ILeftLoyalitiy {
  width?: string;
  flexDirection?: "column" | "row";
}
export interface IRightLoyalitiy {
  width?: string;
}

export interface ILevels {
  name: string;
  number: number;
  percent: number | string;
}

export interface IReferal {
  levelNumber: number;
  count: number;
}
