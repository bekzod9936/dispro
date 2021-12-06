import { useAppDispatch } from "services/redux/hooks";
import { useEffect } from "react";
import messaging from "../../firebase/firebase";
import { isIOS } from "react-device-detect";
import { setMessagingToken } from "services/redux/Slices/firebase";
import firebase from "firebase";

const useFirebase = () => {
  const dispatch = useAppDispatch();

  // const getToken = async () => {
  //   console.log("getting token");
  //   try {
  //     console.log("in try block");
  //     if (firebase.messaging.isSupported() && !isIOS) {
  //       console.log("in If ");
  //       const messaging = await firebase.messaging();

  //       const token = await messaging.getToken();
  //       console.log(token, "response token");
  //       dispatch(setMessagingToken(token));
  //       localStorage.setItem("fcmToken", token);
  //       console.log("firebase token");
  //     }
  //   } catch (error) {
  //     console.log("connection error", error);
  //   }
  // };
  // useEffect(() => {
  //   getToken();
  // }, []);

  useEffect(() => {
    if (firebase.messaging.isSupported() && !isIOS) {
      console.log("get message");
      Notification.requestPermission()
        .then(async () => {
          console.log(messaging, "messaging service");
          const token: any = await messaging.getToken();
          console.log(token);
          return token;
        })
        .catch((e: any) => {
          console.log("connection error", e);
        });
    }
    // .then(async (token: any) => {
    //   dispatch(setMessagingToken(token));
    //   localStorage.setItem("fcmToken", token);
    //   console.log("firebase token");
    // })
  }, []);

  // deviceId
  // fcmToken
  return {};
};

export default useFirebase;
