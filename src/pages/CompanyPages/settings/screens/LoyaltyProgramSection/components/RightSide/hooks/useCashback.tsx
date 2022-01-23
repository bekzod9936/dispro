import { useQuery } from "react-query";
import {
    fetchCashback,
  } from 'services/queries/partnerQuery';


const useCashback=()=>{
    const responseCashback=  useQuery("fetchCashback,", fetchCashback, {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
        onSuccess: (data) => {
   
          console.log('fetchCashback,',data);
        }
      });

      return {responseCashback}

}
export default useCashback;