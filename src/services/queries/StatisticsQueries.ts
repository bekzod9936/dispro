import partnerApi from 'services/interceptors/companyInterceptor';

interface Props {
  section?: string;
}

interface ChProps {
  url?: string;
}

export const fetchCilentsData = ({ section }: Props) => {
  const response = partnerApi.get(`partner-stats/${section}`);
  return response;
};

export const fetchChartStatustics = ({ url }: ChProps) => {
  const response = partnerApi.get(
    `/partner-stats/chart-purchase-operations?${url}`
  );
  return response;
};
