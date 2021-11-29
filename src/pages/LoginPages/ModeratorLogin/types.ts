export interface IForm {
  password: string;
  roleId: { value: number; label?: string };
  telNumber: string;
}

export enum ROLES {
  MANAGER = 2,
  MODERATOR = 5,
  CASHIER = 6,
}
