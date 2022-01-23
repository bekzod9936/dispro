import { useQuery } from "react-query";
import { fetchInfo, fetchPayGoGet } from "services/queries/partnerQuery";
import {setPayGo,
} from "services/redux/Slices/info/info";

import { useAppDispatch } from "services/redux/hooks";

const usePayGo=()=>{
    const dispatch = useAppDispatch();
    const usePayGoResponse = useQuery("payGoGetFetch", () => fetchPayGoGet(), {
        onSuccess: (data) => {
          dispatch(setPayGo(data.data.data.payGo));
        },
      });

      return {usePayGoResponse}

}
export default usePayGo;