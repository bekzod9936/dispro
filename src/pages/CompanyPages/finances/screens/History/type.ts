export interface intialFilterProps {
  page?: number;
  perPage?: number;
  cashierStaffId?: number | string;
  endDate?: string;
  startDate?: string;
  storeId?: number;
  amountCash: string | number;
  amountCard: string | number;
}

export interface SProps {
  rowData: any;
  comment: string;
  open: boolean;
  mobileRow: any;
}
