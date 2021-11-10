import { onMessageListener } from "../../firebase/firebase";
import { useAppDispatch } from "services/redux/hooks";
import { setInfo, setNotifyOpen } from "services/redux/Slices/firebase";

const useGetNotification = () => {
  const dispatch = useAppDispatch();

  onMessageListener()
    .then((payload: any) => {
      console.log(payload);
      dispatch(setNotifyOpen(true));
      dispatch(setInfo(payload?.notification));
    })
    .catch((err) => console.log("failed: ", err));

  return {};
};

export default useGetNotification;
