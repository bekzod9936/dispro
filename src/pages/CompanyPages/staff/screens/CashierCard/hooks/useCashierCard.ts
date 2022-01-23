import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery, useMutation } from "react-query";

//helpers
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { getCashierRatingReview, getStaffData, resetPoints } from "services/queries/staffQuery";
import { setCashierId, setStaffData } from "services/redux/Slices/staffs";


const GET_RATINGS = 'getRatings'

export const useGetRatings = (id: number) => {
	return useQuery([GET_RATINGS, id], () => getCashierRatingReview(id), {
		retry: 1,
		refetchOnWindowFocus: false
	})
}


const useCashierCard = () => {
  const history = useHistory();
  const { state }: any = useLocation();
  const [openQr, setOpenQr] = useState(false);
  const cashierId = useAppSelector((state) => state.staffs.cashierId);
  const dispatch = useAppDispatch();
  const prevPage: any = state?.prevPage || "/staff/cashier";
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
