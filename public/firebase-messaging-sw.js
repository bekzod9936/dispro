importScripts('https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.5/firebase-messaging.js');

const firebaseConfig = {
  apiKey: 'AIzaSyAWYuvkVPG-htfbE1WJf1lWj05XUo2mpm4',
  authDomain: 'dis-count-f5f2a.firebaseapp.com',
  projectId: 'dis-count-f5f2a',
  storageBucket: 'dis-count-f5f2a.appspot.com',
  messagingSenderId: '1013888749180',
  appId: '1:1013888749180:web:d1eeac52de7d330b1343f9',
  measurementId: 'G-VET2ZEC1YD',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  const promiseChain = clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification('my notification title');
    });
  return promiseChain;
});

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
