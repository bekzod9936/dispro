import { useQuery } from "react-query";
import {
    fetchProgramSettings,
  } from 'services/queries/settingsQuery';

const useProgramSettings=()=>{
    const responseProgramSettings=  useQuery("fetchProgramSettings,", fetchProgramSettings, {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
        onSuccess: (data) => {
          console.log('fetchProgramSettings,',data);
        }
      });
      return {responseProgramSettings}
}
export default useProgramSettings;