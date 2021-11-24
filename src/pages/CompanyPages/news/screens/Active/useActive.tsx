import { useQuery } from "react-query";
import { fetchActivenews,searchActiveNews ,setPeriodActiveNews} from "services/queries/newPageQuery";
import {
  setNewsData,
  setNewsTotal,
  setNewsBetween,
  setNewsTotalCount,
  setErrorMessage,
} from "services/redux/Slices/news";
  import { formatPagination } from "services/utils/formatPagination";
  import { useAppDispatch,useAppSelector } from "services/redux/hooks";
  import { useDebounce } from "use-debounce/lib";

interface Props {
  filterValues:any
}

const useActive = ({filterValues}:Props) => {
  const dispatch = useAppDispatch();
  const query=useAppSelector((state)=>state.news.query);
  const page=useAppSelector((state)=>state.news.setPeriod.page)
  const perPage=useAppSelector((state)=>state.news.setPeriod.perPage)
  const toDate=useAppSelector((state)=>state.news.setPeriod.toDate)
  const fromDate=useAppSelector((state)=>state.news.setPeriod.fromDate)

  
  // const startDate=useAppSelector((state)=>state.news.setPeriod.toDate);
  // const endDate=useAppSelector((state)=>state.news.setPeriod.dateTo);
  const [debouncedQuery] = useDebounce(query, 300);

  const response=useQuery(["fetchNews", filterValues,debouncedQuery],
  () => {
     if(debouncedQuery !==''){
       return searchActiveNews(debouncedQuery)
     }

    const url = Object.keys(filterValues)
      .map((v) => `${v}=${filterValues[v]}&`)
      .join("");
      return fetchActivenews({
        url: url,
      });

  },
  {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
     

      dispatch(
        setNewsBetween(
          formatPagination({
            page: page,
            perPage: perPage,
            total: data?.data?.data?.totalCount,
          })
        )
      );
      dispatch(setNewsTotal(Math.ceil(data?.data.data.totalCount/ perPage)))
      dispatch(setNewsTotalCount(data?.data.data.totalCount))
      dispatch(setNewsData(data?.data.data.news))
    
    },
  });
  return { response};
};

export default useActive;
