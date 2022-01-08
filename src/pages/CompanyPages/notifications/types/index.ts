export interface infoProps {
  body?: string;
  createdAt?: string;
  id?: number;
  image?: string;
  isSend?: boolean;
  title?: string;
}

export interface initialPropsReducer {
  open: boolean;
  info: infoProps;
  id?: number;
  data: infoProps[];
  totalCount: number;
  page: number;
  pages: number;
  between: string;
  perPage: number;
}

export interface clickProps {
  value: infoProps;
  open: boolean;
}
