export interface IMessage {
  date?: string;
  firstName?: string;
  id?: number;
  image?: string;
  isDeleted?: boolean;
  lastMsg?: string;
  lastName?: string;
  genderTypeId?: number;
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
  averageRating?: number;
  totalRating?: number;
  socket?: any;
  chosenClient?: IChose;
}
