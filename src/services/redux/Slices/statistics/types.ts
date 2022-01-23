export interface Props {
  ageAvg?: number;
  allClientParkCards?: number;
  cashbackSum?: number;
  chequeAvg?: number;
  chequeCount?: number;
  clientCount?: number;
  couponAmountSum?: number;
  couponDiscountSum?: number;
  discountSum?: number;
  femaleCount?: number;
  filter?: {
    gender?: { id?: number; name?: string }[];
    levels?: { name?: string; number?: number }[];
    referal?: { name?: string; refIds: number[] }[];
    stores?: { address: string; id: number; name: string }[];
  };
  maleCount?: number;
  paidWithMoney?: number;
  paidWithPoint?: number;
  pointSum?: number;
  uniqueChequeClient?: number;
}

export interface OffersProps {
  activeCount: string;
  expireCount: string;
  payedCount: string;
  type: string;
  usedCount: string;
}

export interface OperationsProps {
  cashbackSum?: number | string;
  chequeAvg?: number | string;
  chequeCount?: number | string;
  chequeSum?: number | string;
  discountSum?: number | string;
  paidWithMoney?: number | string;
  paidWithPoint?: number | string;
}

export interface TrafficProps {
  source?: string | number;
  clientCount?: string | number;
  clientPayedCount?: string | number;
  chequeCount?: string | number;
  receipts?: string | number;
}
