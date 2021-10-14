import moment from 'moment';
import partnerApi from 'services/interceptors/companyInterceptor';

interface Props {
  section?: string;
}

export const fetchClientsData = ({ section }: Props) => {
  const response = partnerApi.get(`partner-stats/${section}`);
  return response;
};


export const fetchClients = async (page: number, url: string) => {
  const query = [];
  // if (start) {
  //   query.push(`&startDate=${moment(start).format('YYYY-MM-DD')}`);
  // }
  // if (end) {
  //   query.push(`&endDate=${moment(end).format('YYYY-MM-DD')}`);
  // }
  // let combined = query.join('');
  const response = await partnerApi(
    `/core/client/by/company?page=${page}&perPage=6&${url}`
  );
  return response;
};


export const searchClients = async(start: any, end: any, queryString: string) => {
  const query = [];
  if (start) {
    query.push(`&startDate=${moment(start).format('YYYY-MM-DD')}`);
  }
  if (end) {
    query.push(`&endDate=${moment(end).format('YYYY-MM-DD')}`);
  }
  let combined = query.join('');
  const response = await partnerApi(
    `/core/client/by/company?perPage=6${combined}&key=${queryString}`
  );
  return response;
};