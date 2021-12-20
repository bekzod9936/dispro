import { useAppDispatch } from 'services/redux/hooks';
import { useEffect } from 'react';
import messaging from '../../firebase/firebase';
import { isIOS } from 'react-device-detect';
import { setMessagingToken } from 'services/redux/Slices/firebase';
import firebase from 'firebase';

const useFirebase = () => {
  useEffect(() => {
    if (firebase.messaging.isSupported() && !isIOS) {
      Notification.requestPermission()
        .then(async (res) => {
          const token: any = await messaging.getToken();
          return token;
        })
        .then((token: any) => {
          localStorage.setItem('fcmToken', token);
        })
        .catch((e: any) => {
          console.log('connection error', e);
        });
    }
  }, []);

  return {};
};

export default useFirebase;
