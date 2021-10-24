export interface ITRow {
  background?: boolean | number;
  checked?: boolean;
}

export interface IProps {
  cashiers: ICashTable[];
}

export type HeadersType = {
  value: string;
  label: string;
};

export interface ICashTable {
  firstName?: string;
  score: string | number;
  avgCheque: string | number;
  clients: string | number;
  operations: string | number;
  amountOperation: string | number;
  countRefer: string | number;
}
