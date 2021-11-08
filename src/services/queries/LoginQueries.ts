import axios from 'axios';
import { URL } from '../constants/config';

interface signInProps {
  role: number;
  phoneNumber: string;
}

interface logInProps {
  role: number;
  phoneNumber: string;
  smsCode: string;
}

export const signIn = async ({ role, phoneNumber }: signInProps) => {
  const response = await axios.post(
    `${URL}/auth/signup`,
    {
      telNumber: `+998${phoneNumber}`,
      userType: role,
    },
    {
      headers: {
        langId: 1,
        vers: '0.0.1',
      },
    }
  );
  return response;
};

export const logIn = async ({ role, phoneNumber, smsCode }: logInProps) => {
  const response = await axios.post(
    `${URL}/auth/login`,
    {
      smsCode: smsCode,
      telNumber: `+998${phoneNumber}`,
      userType: role,
    },
    {
      headers: {
        langId: 1,
        vers: '0.0.1',
      },
    }
  );
  return response;
};
