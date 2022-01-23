export interface ICompany {
  categories?: number[];
  socialLinks?: SocialLink[];
  links?: Link[];
  images?: string[];
  id?: number;
  name?: string;
  regionId?: string;
  qrCode?: string;
  annotation?: string;
  description?: string;
  currencyId?: number;
  isHalol?: boolean;
  keyWords?: string;
  telNumber?: string;
  logo?: string;
  workingTime?: WorkingTime | null;
  email?: string;
  program?: null;
  merchantId?: string;
  merchantType?: number;
  merchantFields?: MerchantFields;
  rating?: number;
  status?: number;
  companyNewsLimitCount?: number;
  type?: number;
  disCommission?: number;
  filled?: boolean;
  filledAddress?: boolean;
  hasCoupon?: boolean;
}

export interface Link {
  name: string;
  address: string;
  enable: boolean;
}

export enum MerchantFields {
  Empty = "[]",
  Null = "null",
}

export interface SocialLink {
  name: Name;
  value: string;
}

export enum Name {
  Facebook = "Facebook",
  Instagram = "Instagram",
  Telegram = "Telegram",
  Twitter = "Twitter",
  Viber = "Viber",
  Vkontakte = "Vkontakte",
  WhatsApp = "WhatsApp",
}

export interface WorkingTime {
  work: Work[];
  aroundTheClock: boolean;
}

export interface Work {
  day: number;
  dayOff: boolean;
  wHours: Hours | null;
  bHours: Hours | null;
}

export interface Hours {
  from: string;
  to: string;
}
