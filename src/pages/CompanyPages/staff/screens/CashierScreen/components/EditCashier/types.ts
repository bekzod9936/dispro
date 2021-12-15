export interface IProps {
  openEdit: boolean;
  refetch?: () => void
}

export interface FormProps {
  firstName: string;
  lastName: string;
  comment?: string;
  storeIds: any;
  telNumber: string;
}
