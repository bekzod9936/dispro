import { useQuery } from "react-query";
import { fetchArchiveNews,searchArchiveNews } from "services/queries/newPageQuery";
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

function handleSort(arr:any){
 return [...arr].sort((a,b)=> new Date(b.startLifeTime).getTime()-new Date(a.startLifeTime).getTime())
}  

const useArchive = ({filterValues}:PProps) => {
  const dispatch = useAppDispatch();
  const query=useAppSelector((state)=>state.news.query);
  const [debouncedQuery] = useDebounce(query, 300);
  const response=useQuery(["fetchNews",filterValues, debouncedQuery],
  () => {
     if(debouncedQuery !==''){
       return searchArchiveNews(debouncedQuery)
     }
    const url = Object.keys(filterValues)
      .map((v: any) => `${v}=${filterValues[v]}&`)
      .join("");
      return fetchArchiveNews({
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
      let res=handleSort(data.data.data.news)
      dispatch(setNewsData(res))
  
    },
  });
  return { response};
};

export default useArchive;
