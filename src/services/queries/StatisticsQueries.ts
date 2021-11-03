import partnerApi from 'services/interceptors/companyInterceptor';

interface Props {
  section?: string;
}

export const fetchCilentsData = ({ section }: Props) => {
  const response = partnerApi.get(`partner-stats/${section}`);
  return response;
};

export const fetchChartStatustics = () => {
  const response = partnerApi.get(`/partner-stats/chart-purchase-operations`);
  return response;
};
