import { useEffect, useState } from "react";
import firebase from "../../firebase/firebase";

const useFirebase = () => {
  const [messagingToken, setMessagingToken] = useState("");

  useEffect(() => {
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
  }, []);

  return {
    messagingToken,
  };
};

export default useFirebase;
