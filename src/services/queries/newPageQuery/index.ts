import partnerApi from "../../interceptors/companyInterceptor";
interface Props {
  url: string;
}
export const fetchFilials = () => {
  const response = partnerApi.get("/directory/store");
  return response;
};

export const fetchPendingNews = (section: string) => {
  const response = partnerApi.get("/core/news/by/company/" + section);
  return response;
};

export const fetchActiveQueries = ({url}:Props) => {
  const response = partnerApi.get(`/core/news/by/company/actives/new?${url}`);
  return response;
};

export const searchQueries=(search:string|undefined)=>{
  const response = partnerApi.get(`/core/news/by/company/actives/new?key=${search}`);
  return response;
}

export const fetchCreateNews = async (data: any) => {
  const response = await partnerApi.post("/core/news", data)
  return response;
}
// export const fetchArchiveQueries = () => {
// 	const response = partnerApi.get("/core/news/by/company/archives");
// 	return response;
// };
