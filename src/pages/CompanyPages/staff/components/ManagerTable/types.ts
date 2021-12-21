export interface ITRow {
  background?: boolean | number;
  checked?: boolean;
}
export interface IProps {
  managers: IManageTable[];
  page: number;
  setPage: (arg: number) => void;
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
export interface IHeader {
	header?: boolean;
  }
export interface ITh {
	active?: boolean;
  }
export interface Props {
	up?: boolean;
	active?: boolean;
  }