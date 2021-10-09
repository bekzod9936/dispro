import partnerApi from '../interceptors/companyInterceptor';

interface Props {
  section?: string;
}

export const fetchCilentsData = ({ section }: Props) => {
  const response = partnerApi.get(`partner-stats/${section}`);
  return response;
};
