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
  //   useEffect(() => {

  // navigator.serviceWorker.addEventListener("message", (message) => {
  //   const notif =
  //     message?.data?.["firebase-messaging-msg-data"]?.notification;
  //   console.log("111111  get notification 111111", notif);

  //   // showNotification("info", notif?.title, notif?.body, 0);
  // });
  //   }, []);
  return {};
};

export default useGetNotification;
