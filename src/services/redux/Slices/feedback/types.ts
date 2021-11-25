export interface IMessage {
  date?: string;
  firstName?: string;
  id?: number;
  image?: string;
  isDeleted?: boolean;
  lastMsg?: string;
  lastName?: string;
  genderTypeId?: number;
  obtainProgramLoyalty?: { levelName?: string; percent?: number };
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
  avg?: number;
  count?: number;
  downVal?: number;
  upVal?: number;
}

export interface IFeedBack {
  messages?: IMessage[];
  cashiers?: ICashiers[];
  clients?: IratingAndReviews[];
  ratings?: IRatings[];
  histories?: IHistory[];
  supporthistories?: IHistory[];
  totalHistory?: number;
  totalSupportHistory?: number;
  totalCount?: number;
  averageRating?: IRating;
  socket?: any;
  chosenClient?: IChose;
}
