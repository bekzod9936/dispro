import { useEffect, useState } from "react";
import firebase from "../../firebase/firebase";
import { isIOS } from "react-device-detect";

const useFirebase = () => {
  const [messagingToken, setMessagingToken] = useState("");

  useEffect(() => {
    if (firebase.default.messaging.isSupported() && !isIOS) {
      const messaging = firebase.default.messaging();
      messaging
        .requestPermission()
        .then(() => {
          return messaging.getToken();
        })
        .then((token) => {
          setMessagingToken(token);
          console.log("firebase token");
        })
        .catch((e) => {
          console.log("connection error", e);
        });
    }
  }, []);

  // deviceId
  // fcmToken
  return {
    messagingToken,
  };
};

export default useFirebase;
