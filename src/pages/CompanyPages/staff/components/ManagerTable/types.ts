export interface ITRow {
  background?: boolean | number;
  checked?: boolean;
}

export interface IProps {
  managers: IManageTable[];
}

export type HeadersType = {
  value: string;
  label: string;
};

export interface IManageTable {
  firstName?: string;
  telNumber?: string;
  comment?: string;
}
