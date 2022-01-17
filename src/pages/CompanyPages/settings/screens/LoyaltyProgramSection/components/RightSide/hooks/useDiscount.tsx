import { useQuery } from "react-query";
import {
    fetchDiscount,
  } from 'services/queries/partnerQuery';


const useDiscounts=()=>{
    const responseDiscount=  useQuery("fetchDiscount,", fetchDiscount, {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
        onSuccess: (data) => {
       
          console.log('fetchDiscount,',data);
        }
      });

      return {responseDiscount}

}
export default useDiscounts;