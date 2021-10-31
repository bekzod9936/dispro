import { useState } from "react";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { useQuery } from "react-query";
import { getStaffData } from "services/queries/StaffQueries";
import { setStaffData } from "services/redux/Slices/staffs";

const useCashierCard = () => {
  const [openQr, setOpenQr] = useState(false);
  const cashierId = useAppSelector((state) => state.staffs.cashierId);
  const dispatch = useAppDispatch();

  const { isLoading } = useQuery(
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
        }
      },
    }
  );

  return {
    isLoading,
    openQr,
    setOpenQr,
  };
};

export default useCashierCard;
