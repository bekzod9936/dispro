import { useCallback, useReducer } from "react";
import { useQuery } from "react-query";
import { fetchNotifactions } from "services/queries/notificationQuery";
import { formatPagination } from "services/utils/formatPagination";
import isYesterday from "dayjs/plugin/isYesterday";
import isToday from "dayjs/plugin/isToday";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { initialState, reducerNote } from "./reducer";
import { clickProps } from "./types";

const useNotefications = () => {
  const [state, dispatchReducer] = useReducer(reducerNote, initialState);
  const { perPage, data, totalCount, pages, between, page } = state;

  dayjs.extend(isYesterday);
  dayjs.extend(isToday);

  const { t } = useTranslation();
  const currentYear: any = new Date().getFullYear();

  const handleChangePage = useCallback(
    (e: number) => dispatchReducer({ type: "setPage", payload: e }),
    []
  );

  const onClick = useCallback(({ value, open }: clickProps) => {
    dispatchReducer({ type: "setOpen", payload: open });
    dispatchReducer({ type: "setInfo", payload: value });
    dispatchReducer({ type: "setId", payload: value?.id });
  }, []);

  const response = useQuery(
    ["fetchSuggestionInfo", page],
    () =>
      fetchNotifactions({
        page,
        perPage,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        const newData = data.data.data.announcements.map((v: any) => {
          const date = dayjs(v.createdAt).isYesterday()
            ? t("yesterday")
            : dayjs(v.createdAt).isToday()
            ? t("today")
            : Number(dayjs(v.createdAt).format("YYYY")) === currentYear
            ? dayjs(v.createdAt).format("DD MMMM")
            : dayjs(v.createdAt).format("DD MMMM YYYY");
          return { ...v, createdAt: date };
        });

        dispatchReducer({ type: "setData", payload: newData });
        dispatchReducer({
          type: "setBetween",
          payload: formatPagination({
            page: page,
            perPage: perPage,
            total: data.data.data.totalCount,
          }),
        });
        dispatchReducer({
          type: "setPages",
          payload: data.data.data.totalCount,
        });
        dispatchReducer({
          type: "setTotalCount",
          payload: Math.ceil(data.data.data.totalCount / perPage),
        });
      },
    }
  );

  return {
    response,
    data,
    totalCount,
    between,
    pages,
    page,
    state,
    handleChangePage,
    onClick,
    dispatchReducer,
  };
};

export default useNotefications;
