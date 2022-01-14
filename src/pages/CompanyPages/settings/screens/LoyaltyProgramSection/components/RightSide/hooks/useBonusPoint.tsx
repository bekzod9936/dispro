import { useQuery } from "react-query";
import {
  fetchBonusPoints,
  } from 'services/queries/partnerQuery';


const useBonusPoints=()=>{
    const responseBonusPoint=  useQuery("fetchBonusPoints", fetchBonusPoints, {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
        onSuccess: (data) => {
          console.log('bonusPoint',data);
        }
      });

      return {responseBonusPoint}

}
export default useBonusPoints;