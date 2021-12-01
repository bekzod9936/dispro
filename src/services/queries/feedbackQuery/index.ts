import partnerApi from 'services/interceptors/partner_interceptor';

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

interface DProps {
  data?: any;
}

export const deleteChat = ({ data }: DProps) => {
  const response = partnerApi.delete(`/core/chat/history`, { data: data });
  return response;
};

export const fetchReadChats = ({ data }: DProps) => {
  const response = partnerApi.put(`/core/chat/read`, { msgIds: data });
  return response;
};
