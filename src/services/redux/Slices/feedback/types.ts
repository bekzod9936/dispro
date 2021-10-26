export interface IMessage {
  date?: string;
  firstName?: string;
  id?: number;
  image?: string;
  isDeleted?: boolean;
  lastMsg?: string;
  lastName?: string;
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

export interface IFeedBack {
  messages?: IMessage[];
  cashiers?: ICashiers[];
  clients?: IratingAndReviews[];
  ratings?: IRatings[];
  histories?: IHistory[];
  totalHistory?: number;
  totalCount?: number;
  averageRating?: number;
  totalRating?: number;
  socket?: any;
}
