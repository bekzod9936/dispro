importScripts("https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.5/firebase-messaging.js");
console.warn("HERE IT IS !!");
const firebaseConfig = {
  apiKey: "AIzaSyDFYaUQdP3lynCwt42TpGO6Wt9hJHMp5Ec",
  authDomain: "dis-mobile.firebaseapp.com",
  databaseURL: "https://dis-mobile.firebaseio.com",
  projectId: "dis-mobile",
  storageBucket: "dis-mobile.appspot.com",
  messagingSenderId: "897512733982",
  appId: "1:897512733982:web:b0c0ee1385f524c1961d0f",
  measurementId: "G-63K4CE8KCY",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  return self.registration.showNotification("Title", payload);
});
