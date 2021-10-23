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
  totalCount?: number;
  averageRating?: number;
  totalRating?: number;
}
