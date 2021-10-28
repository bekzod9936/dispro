export interface staffsState {
  cashiers: ICashiers[];
  managers: IManagers[];
  query?: string;
  allCashiers?: any;
  allManagers?: any;
  selectedCashiers?: any;
  selectedManagers?: any;
  openFilter: boolean;
  openCash: boolean;
  openManager: boolean;
  summaOperations: any;
}

export interface ICashiers {
  addInfo?: {
    amountOperation?: number;
    avgCheque?: number;
    avgRating?: number;
    countClient?: number;
    countOperation?: number;
    countRefer?: number;
  };
  cheavie?: boolean;
  comment?: string;
  company?: string | number;
  companyId?: number;
  companyName?: string;
  companyType?: number;
  countryId?: number;
  createdAt?: string;
  email?: string;
  firstName?: string;
  id?: number;
  langId?: number;
  lastName?: string;
  logo?: string;
  roleId?: number;
  store?: string | number;
  storeId?: number;
  telNumber?: string;
  userId?: number;
}

export interface IManagers {
  addInfo?: any;
  cheavie?: boolean;
  comment?: string;
  company?: any;
  companyId?: number;
  companyName?: string;
  companyType?: number;
  countryId?: number;
  createdAt?: string;
  email?: string;
  firstName?: string;
  id?: number;
  langId?: number;
  lastName?: string;
  logo?: string;
  roleId?: number;
  store?: any;
  storeId?: number;
  telNumber?: string;
  userId?: number;
}
