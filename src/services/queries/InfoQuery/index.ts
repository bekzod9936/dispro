import axios from 'axios';
import { STORAGE_URL } from '../../constants/config';
import partnerApi from '../../interceptors/companyInterceptor';

interface deleteProps {
  body: any;
}

interface upLoadProps {
  body: any;
}

interface iProps {
  companyId?: any;
}

interface ILimit {
  companyId?: any;
  currency?: any;
}

const token = localStorage.getItem('companyToken');

export const deletePhoto = ({ body }: deleteProps) => {
  return axios.delete(`${STORAGE_URL}/company`, {
    data: {
      links: [body],
    },
    headers: {
      authorization: `Bearer ${token}`,
      langId: 1,
    },
  });
};

export const uploadPhoto = ({ body }: upLoadProps) => {
  return axios.post(`${STORAGE_URL}/company/upload`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: `Bearer ${token}`,
      langId: 1,
    },
  });
};

export const fetchCategories = () => {
  return partnerApi.get('/directory/category');
};

export const fetchAddressInfo = ({ companyId }: iProps) => {
  return partnerApi.get(`directory/stores/by-company/${companyId}`);
};

export const fetchAddressMain = ({ companyId }: iProps) => {
  return partnerApi.get(`directory/company/address/${companyId}`);
};

export const fetchLimitFinance = ({ companyId, currency }: ILimit) => {
  return partnerApi.get(
    `/banking/accounts/company/list?companyId=${companyId}&currency=${currency}`
  );
};
