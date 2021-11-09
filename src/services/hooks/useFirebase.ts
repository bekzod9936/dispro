import { useAppDispatch } from "services/redux/hooks";
import { useEffect } from "react";
import firebase from "../../firebase/firebase";
import { isIOS } from "react-device-detect";
import { setMessagingToken } from "services/redux/Slices/firebase";

const useFirebase = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (firebase.default.messaging.isSupported() && !isIOS) {
      const messaging = firebase.default.messaging();
      messaging
        .requestPermission()
        .then(() => {
          return messaging.getToken();
        })
        .then((token) => {
          dispatch(setMessagingToken(token));
          localStorage.setItem("fcmToken", token);
          console.log("firebase token");
        })
        .catch((e) => {
          console.log("connection error", e);
        });
    }
  }, []);

  // deviceId
  // fcmToken
  return {};
};

export default useFirebase;
