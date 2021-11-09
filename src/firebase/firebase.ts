import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAWYuvkVPG-htfbE1WJf1lWj05XUo2mpm4",
  authDomain: "dis-count-f5f2a.firebaseapp.com",
  projectId: "dis-count-f5f2a",
  storageBucket: "dis-count-f5f2a.appspot.com",
  messagingSenderId: "1013888749180",
  appId: "1:1013888749180:web:d1eeac52de7d330b1343f9",
  measurementId: "G-VET2ZEC1YD",
};

// Initialize Firebase
const app = firebase.default.initializeApp(firebaseConfig);
const messaging = firebase.default.messaging();
const analytics = firebase.default.analytics(app);

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });

export default firebase;
