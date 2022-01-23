export interface ILinks {
  address?: string;
  enable?: boolean;
  name?: string;
}

export interface ISocialLinks {
  name?: string;
  value?: string;
}

export interface IFromTo {
  from?: string;
  to?: string;
}

export interface IWork {
  bHours?: IFromTo;
  day?: number;
  dayOff?: boolean;
  wHours?: IFromTo;
}

export interface IWorkTime {
  aroundTheClock?: boolean;
  work?: IWork[];
}

export interface IAccounts {
  id: number;
  type: number;
  balance: number;
  limit: number;
}

export interface IInfo {
  annotation?: string;
  categories?: number[];
  companyNewsLimitCount?: number;
  currencyId?: number;
  description?: string;
  disCommission?: number;
  email?: string;
  filled?: boolean;
  filledAddress?: boolean;
  hasCoupon?: boolean;
  id?: number;
  images?: string[];
  isHalol?: boolean;
  keyWords?: string;
  links?: ILinks[];
  logo?: string;
  merchantFields?: string;
  merchantId?: string | number;
  merchantType?: number;
  name?: string;
  program?: any;
  qrCode?: string;
  rating?: number;
  regionId?: string | number;
  socialLinks?: ISocialLinks[];
  staffId?: number;
  status?: number;
  telNumber?: string;
  type?: number;
  workingTime?: IWorkTime | null;
}

export interface  RProps { label?: string; value?: string | number }