import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { useQuery, useMutation } from "react-query";
import { getStaffData, resetPoints } from "services/queries/StaffQueries";
import { setCashierId, setStaffData } from "services/redux/Slices/staffs";

const useCashierCard = () => {
  const history = useHistory();
  const { state }: any = useLocation();
  const [openQr, setOpenQr] = useState(false);
  const cashierId = useAppSelector((state) => state.staffs.cashierId);
  const dispatch = useAppDispatch();
  const prevPage: any = state?.prevPage || "/staff";
  const cashId: any = state?.id;

  const resetPoint = useMutation((data: any) => resetPoints(data), {
    onSuccess: () => {
      refetch();
    },
  });

  const { isLoading, refetch } = useQuery(
    ["cashierData", cashierId],
    () => {
      return getStaffData(cashierId);
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(data.data.data, "data 123");
        if (data?.data?.data?.cashier) {
          dispatch(setStaffData(data.data.data.cashier));
        } else {
          console.log("pushed");
          history.push(prevPage);
        }
      },
      onError: (error) => {
        history.push(prevPage);
      },
    }
  );

  useEffect(() => {
    if (!cashierId) {
      dispatch(setCashierId(cashId));
    }
  }, [cashierId]);

  return {
    isLoading,
    openQr,
    setOpenQr,
    resetPoint,
  };
};

export default useCashierCard;
