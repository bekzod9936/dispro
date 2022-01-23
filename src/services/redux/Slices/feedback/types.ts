export interface IMessage {
  chatType?: number;
  date?: string;
  firstName?: string;
  genderTypeId?: number;
  id?: number;
  image?: string;
  isDeleted?: boolean;
  lastMsg?: string;
  lastName?: string;
  obtainProgramLoyalty?: { levelName?: string; percent?: number };
  status?: number;
}

export interface ICashiers {
  cashierId?: number;
  firstName?: string;
  lastName?: string;
}

export interface IratingAndReviews {
  cashierId?: number;
  clientFirstName?: string;
  clientId?: number;
  clientImage?: string;
  clientLastName?: string;
  createdAt?: string;
  firstName?: string;
  lastName?: string;
  rating?: number;
  review?: string;
  clientGenderTypeId?: number;
  obtainProgramLoyalty?: { levelName?: string; percent?: number };
  amountReturned?: number;
  payDate?: string;
  storeName?: string;
  totalAmount?: number;
  usedPointAmount?: number;
}

export interface IHistory {
  chatType?: number;
  companyId?: number;
  createdAt?: string;
  fromId?: number;
  id?: number;
  msg?: string;
  status?: number;
  toId?: number;
}

export interface IRatings {
  amount?: number;
  percentage?: number;
  rating?: number;
}

export interface IChose {
  data?: IratingAndReviews;
  choose?: boolean;
}

export interface IRating {
  avg?: number | null;
  count?: number;
  downVal?: number;
  upVal?: number;
}

export interface IChoose {
  chosen?: IMessage;
  isChoose?: boolean;
  inntialHistory?: { page?: number; perPage?: number };
  fetchHistory?: boolean;
}

export interface ITHistorySupport {
  total?: number;
  page?: number;
  perPage?: number;
  loading?: boolean;
  hasMore?: boolean;
}

export interface IUsersProps {
  id?: number;
  messages?: IHistory[];
  totalMessages?: number;
  hasMore?: boolean;
  page?: number;
  info?: IMessage;
}

interface IStores {
  address: string;
  id: number;
  name: string;
}

export interface IFiter {
  cashiers?: ICashiers[];
  stores?: IStores[];
}
export interface IFeedBack {
  messages?: IMessage[];
  clients?: IratingAndReviews[];
  ratings?: IRatings[];
  histories?: IHistory[];
  supporthistories?: IHistory[];
  filter?: IFiter;
  totalHistory?: ITHistorySupport;
  totalSupportHistory?: ITHistorySupport;
  totalCount?: number;
  averageRating?: IRating;
  socket?: any;
  chosenClient?: IChose;
  chosenListUser?: IChoose;
  badgeStorePost?: IMessage;
  users?: IUsersProps[];
}
