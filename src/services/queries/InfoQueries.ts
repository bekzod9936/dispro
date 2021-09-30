import axios from 'axios';
import { STORAGE_URL } from '../../services/constants/config';
import partnerApi from '../interceptors/companyInterceptor';

interface deleteProps {
  body: any;
}

interface upLoadProps {
  body: any;
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

export const fetchAddressInfo = (id: string | number) => {
  return partnerApi.get(`directory/stores/by-company/${id}`);
};
