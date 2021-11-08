export interface ISuggestion {
  amount: number;
  amountPartner: number;
  closed: boolean;
  couponName: string;
  couponType: number;
  disCommission: number;
  finished: boolean;
  firstName: string;
  id: number;
  lastName: string;
  payDate: string;
  payType: number;
}

export interface IPayment {
  amount: number;
  amountPartner: number;
  cardNumber: string;
  closed: boolean;
  disCommission: number;
  finished: boolean;
  firstName: string;
  id: number;
  lastName: string;
  payDate: string;
}

export interface ICashBack {
  activateDate: string;
  amount: number;
  amountCommission: number;
  clientName: string;
  date: string;
  finished: boolean;
  operationType: string;
  status: string;
}

export interface IPayInfo {
  amountMinus: number;
  amountPayed: number;
  amountTotal: number;
  isCashback: boolean;
  isCoupon: boolean;
  isDiscount: boolean;
  isPoints: boolean;
  usedPointAmount: number;
  value: number;
  valueType: string;
}

export interface IHistory {
  cashierName: string;
  chequeDate: string;
  chequeStatus: number;
  clientName: string;
  payInfo: IPayInfo;
}

export interface IPayHeader {
  title?: string;
  value?: number;
}

export interface ISum {
  total: number;
  minus: number;
  paid: number;
}

export interface ICashier {
  value?: number;
  label?: string;
}

export interface IFinance {
  suggestionFinance: {
    data: ISuggestion[];
    totalCount: number;
    between: string;
  };
  paymentFinance: {
    data: IPayment[];
    totalCount: number;
    between: string;
    header: IPayHeader[];
  };
  cashBackFinance: {
    data: ICashBack[];
    totalCount: number;
    between: string;
    header: IPayHeader[];
  };
  historyFinance: {
    data: IHistory[];
    totalCount: number;
    between: string;
    sum: ISum;
    cashier: ICashier[];
  };
}

export interface ICachBack {}