import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery, useMutation } from "react-query";

//helpers
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { getStaffData, resetPoints } from "services/queries/staffQuery";
import { setCashierId, setStaffData } from "services/redux/Slices/staffs";

const useCashierCard = () => {
  const history = useHistory();
  const { state }: any = useLocation();
  const [openQr, setOpenQr] = useState(false);
  const cashierId = useAppSelector((state) => state.staffs.cashierId);
  const dispatch = useAppDispatch();
  const prevPage: any = state?.prevPage || "/staff";
  const cashId: any = state?.id;
  const [optionsOpen, setOptionsOpen] = useState<string | number>('');

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
      refetchOnReconnect: false,
      onSuccess: (data) => {
		  console.log('asdsadsadsad', data?.data?.data)
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

  const handleOption = (id: any) => {
	  console.log('optionsOpen', id)
    if (!optionsOpen) {
      setOptionsOpen(id);
    } else {
      setOptionsOpen("");
    }
  };

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
	refetch,
	handleOption
  };
};

export default useCashierCard;
