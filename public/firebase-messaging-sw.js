importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");

var firebaseConfig = {
  apiKey: "AIzaSyDFYaUQdP3lynCwt42TpGO6Wt9hJHMp5Ec",
  authDomain: "dis-mobile.firebaseapp.com",
  databaseURL: "https://dis-mobile.firebaseio.com",
  projectId: "dis-mobile",
  storageBucket: "dis-mobile.appspot.com",
  messagingSenderId: "897512733982",
  appId: "1:897512733982:web:b0c0ee1385f524c1961d0f",
  measurementId: "G-63K4CE8KCY",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
  return promiseChain;
});
self.addEventListener("notificationclick", function (event) {
  // console.log(event);
});
