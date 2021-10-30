import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import {
  getManagers,
  searchManagers,
  setRoleManager,
} from "services/queries/StaffQueries";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { setAllManager, setManagers } from "services/redux/Slices/staffs";
import { numberWith } from "services/utils";

const useManagers = ({ page, query, period }: any) => {
  const userId = useAppSelector((state) => state.staffs.userId);
  const [modified, setModified] = useState("1");

  const dispatch = useAppDispatch();
  console.log(userId, "UserId");

  //set role manager
  const saveRoleManager = useMutation((data: any) =>
    setRoleManager({ userId, permissions: data })
  );

  const response = useQuery(
    ["cashiers", page, query, period],
    () => {
      if (query !== "") {
        return searchManagers(query);
      }
      const url = Object.keys(period)
        .map((e: string) => `${e}=${period[e]}&`)
        .join("");
      return getManagers(page, url);
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      refetchIntervalInBackground: true,
      cacheTime: 50000,
      onSuccess: (data) => {
        dispatch(setManagers(data.data.data));
        if (data?.data?.data?.length) {
          dispatch(
            setAllManager(
              data?.data?.data?.map((manager: any) => {
                return {
                  ...manager,
                  firstName: manager?.firstName + " " + manager?.lastName,
                  score: numberWith(manager?.addInfo?.avgRating, " "),
                  avgCheque: numberWith(manager?.addInfo?.avgCheque, " "),
                  clients: numberWith(manager?.addInfo?.countClient, " "),
                  operations: numberWith(manager?.addInfo?.countOperation, " "),
                  amountOperation: numberWith(
                    manager?.addInfo?.amountOperation,
                    " "
                  ),
                  countRefer: numberWith(manager?.addInfo?.countRefer, " "),
                };
              })
            )
          );
        }
      },
    }
  );

  return {
    response,
    saveRoleManager,
    modified,
    setModified,
  };
};

export default useManagers;
