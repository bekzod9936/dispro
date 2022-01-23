import * as firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyAWYuvkVPG-htfbE1WJf1lWj05XUo2mpm4',
  authDomain: 'dis-count-f5f2a.firebaseapp.com',
  projectId: 'dis-count-f5f2a',
  storageBucket: 'dis-count-f5f2a.appspot.com',
  messagingSenderId: '1013888749180',
  appId: '1:1013888749180:web:d1eeac52de7d330b1343f9',
  measurementId: 'G-VET2ZEC1YD',
});

let messaging: any;

// const analytics = firebase.analytics(app);

if (firebase.messaging.isSupported()) {
  messaging = firebaseConfig.messaging();
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload: any) => {
      resolve(payload);
    });
  });

export default messaging;
