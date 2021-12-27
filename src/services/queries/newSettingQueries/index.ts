import partnerApi from 'services/interceptors/partner_interceptor';

//rewarding

export const fetchRewards = () => {
  const response = partnerApi.get('/bonus/rewards');
  return response;
};

export const postRewards = (data: any) => {
  const response = partnerApi.post('/bonus/rewards', data);
  return response;
};

//security

export const fetchSecurity = () => {
  const response = partnerApi.get('/core/company-safeties');
  return response;
};

export const postSecurity = (data: any) => {
  const response = partnerApi.put('/core/company-safeties', data);

  return response;
};


//qrcodes

export const fetchQRCodes = () => {
  const response = partnerApi.get('/core/ref');
  return response;
};
