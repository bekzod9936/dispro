import { useQuery } from "react-query";
import {
  fetchActivenews,
  searchActiveNews,
  setPeriodActiveNews,
} from "services/queries/newPageQuery";
import {
  setNewsData,
  setNewsTotal,
  setNewsBetween,
  setNewsTotalCount,
  setErrorMessage,
} from "services/redux/Slices/news";
import { formatPagination } from "services/utils/formatPagination";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { useDebounce } from "use-debounce/lib";

interface Props {
  filterValues: any;
}

function handleSort(arr: any) {
  return [...arr].sort(
    (a, b) =>
      new Date(b.startLifeTime).getTime() - new Date(a.startLifeTime).getTime()
  );
}

const useActive = ({ filterValues }: Props) => {
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.news.query);

  const [debouncedQuery] = useDebounce(query, 300);

  const response = useQuery(
    ["fetchActiveNews", filterValues, debouncedQuery],
    () => {
      const url = Object.keys(filterValues)
      .map((v) => `${v}=${filterValues[v]}&`)
      .join("");
 
      if (debouncedQuery !== "") {
        return searchActiveNews({url:url+`&key=${debouncedQuery}`});
      }
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
              page: filterValues?.page,
              perPage: filterValues?.perPage,
              total: data.data.data.totalCount,
            })
          )
        );
        dispatch(
          setNewsTotal(
            Math.ceil(data.data.data.totalCount / filterValues?.perPage)
          )
        );
        dispatch(setNewsTotalCount(data.data.data.totalCount));
        let res = handleSort(data.data.data.news);
        dispatch(setNewsData(res));
      },
    }
  );
  return { response };
};

export default useActive;
