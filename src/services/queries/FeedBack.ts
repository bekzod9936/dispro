import partnerApi from 'services/interceptors/companyInterceptor';

interface Props {
  url: any;
}

export const fetchFeedBackClients = ({ url }: Props) => {
  const response = partnerApi.get(`core/cashier${url}`);
  return response;
};

export const fetchFeedBackCashiers = () => {
  const response = partnerApi.get(`core/cashier/has-ratings`);
  return response;
};

export const fetchChatClients = () => {
  const response = partnerApi.get('/core/chat/list-partner-clients');
  return response;
};

export const fetchClientsRatings = () => {
  const response = partnerApi.get('/core/cashier/rating-review-avg-sum');
  return response;
};

export const fetchChatClientHistory = ({ url }: Props) => {
  const response = partnerApi.get(`/core/chat/history?${url}`);
  return response;
};

export const fetchChatSupportHistory = ({ url }: Props) => {
  const response = partnerApi.get(`/core/chat/history?${url}`);
  return response;
};
