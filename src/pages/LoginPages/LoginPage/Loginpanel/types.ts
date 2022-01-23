export enum USERTYPE {
  ADMIN = "2",
  MANAGER = "4",
}

export interface FormProps {
  role: { value?: string; label?: string };
  phoneNumber: string;
  smsCode: string;
}

export interface PropLog {
  role: { value?: string; label?: string };
  phoneNumber: string;
  smsCode: string;
}

export interface PropSign {
  role: { value?: string; label?: string };
  phoneNumber: string;
}
