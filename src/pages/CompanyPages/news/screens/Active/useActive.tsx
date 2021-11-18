import { useQuery } from "react-query";
import { fetchActivenews,searchActiveNews ,setPeriodActiveNews} from "services/queries/newPageQuery";
import {
  setNewsData,
  setNewsTotal,
  setNewsBetween,
  setNewsTotalCount,
} from "services/redux/Slices/news";
  import { formatPagination } from "services/utils/formatPagination";
  import { useAppDispatch,useAppSelector } from "services/redux/hooks";
  import { useDebounce } from "use-debounce/lib";
  interface PProps {
    filterValues: any;
  }
const useActive = ({filterValues}:PProps) => {
  const dispatch = useAppDispatch();
  const query=useAppSelector((state)=>state.news.query);
  const startDate=useAppSelector((state)=>state.news.setPeriod.dateFrom);
  const endDate=useAppSelector((state)=>state.news.setPeriod.dateTo);
  const [debouncedQuery] = useDebounce(query, 300);

  const response=useQuery(["fetchNews",filterValues, debouncedQuery],
  () => {
     if(debouncedQuery !==''){
       return searchActiveNews(debouncedQuery)
     }

    const url = Object.keys(filterValues)
      .map((v: any) => `${v}=${filterValues[v]}&`)
      .join("");
      return fetchActivenews({
        url: url,
      });
    // return fetchActiveQueries({
    //   url: url+`key=${debouncedQuery}`,
    // });
  },
  {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
     

      dispatch(
        setNewsBetween(
          formatPagination({
            page: filterValues?.page,
            perPage: filterValues?.perPage,
            total: data.data.data.totalCount,
          })
        )
      );
      dispatch(setNewsTotal(Math.ceil(data.data.data.totalCount/ filterValues?.perPage)))
      dispatch(setNewsTotalCount(data.data.data.totalCount))
      dispatch(setNewsData(data.data.data.news))
  
    },
  });
  return { response};
};

export default useActive;
