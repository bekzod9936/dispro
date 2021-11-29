import partnerApi from "../../interceptors/partner_interceptor";
interface Props {
  url: string;
}
// export const fetchFilials = () => {
//   const response = partnerApi.get("/directory/store");
//   return response;
// };

// export const fetchPendingNews = (section: string) => {
//   const response = partnerApi.get("/core/news/by/company/" + section);
//   return response;
// };

export const fetchActivenews = ({ url }: Props) => {
  const response = partnerApi.get(`/core/news/by/company/actives/new?${url}`);
  return response;
};

export const fetchPendingNews = ({ url }: Props) => {
  const response = partnerApi.get(`/core/news/by/company/pending/new?${url}`);
  return response;
};

export const fetchArchiveNews = ({ url }: Props) => {
  const response = partnerApi.get(`/core/news/by/company/archives/new?${url}`);
  return response;
};

export const searchActiveNews = (search: string | undefined) => {
  const response = partnerApi.get(
    `/core/news/by/company/actives/new?key=${search}`
  );
  return response;
};
export const setPeriodActiveNews = (data: any) => {
  const response = partnerApi.get(
    `/core/news/by/company/actives/new?startDate=${data?.startDate}&endDate=${data.endDate}`
  );
  return response;
};

export const searchPendingNews = (search: string | undefined) => {
  const response = partnerApi.get(
    `/core/news/by/company/pending/new?key=${search}`
  );
  return response;
};

export const searchArchiveNews = (search: string | undefined) => {
  const response = partnerApi.get(
    `/core/news/by/company/archives/new?key=${search}`
  );
  return response;
};

export const fetchCreateNews = async (data: any) => {
  const response = await partnerApi.post("/core/news", data);
  return response;
};

export const fetchUpdateNews = async (data: any) => {
  const response = await partnerApi.put(
    `core/news/${data.newsId}`,
    data.newsBody
  );
  return response;
};

export const deleteNews = async (id: number) => {
  await partnerApi.delete("/core/news", {
    data: {
      ids: [id],
    },
  });
};
// export const fetchArchiveQueries = () => {
// 	const response = partnerApi.get("/core/news/by/company/archives");
// 	return response;
// };
