import { useQuery } from "react-query";
import { fetchPendingNews,searchPendingNews } from "services/queries/newPageQuery";
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
const useWaiting = ({filterValues}:PProps) => {
  const dispatch = useAppDispatch();
  const query=useAppSelector((state)=>state.news.query);
  const [debouncedQuery] = useDebounce(query, 300);
  const response=useQuery(["fetchNews",filterValues, debouncedQuery],
  () => {
     if(debouncedQuery !==''){
       return searchPendingNews(debouncedQuery)
     }
    const url = Object.keys(filterValues)
      .map((v: any) => `${v}=${filterValues[v]}&`)
      .join("");
      return fetchPendingNews({
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
      console.log("data", data.data.data);
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

export default useWaiting;
