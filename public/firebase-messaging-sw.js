importScripts("https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.5/firebase-messaging.js");
console.warn("HERE IT IS !!");
const firebaseConfig = {
	apiKey: "AIzaSyAWYuvkVPG-htfbE1WJf1lWj05XUo2mpm4",
	authDomain: "dis-count-f5f2a.firebaseapp.com",
	projectId: "dis-count-f5f2a",
	storageBucket: "dis-count-f5f2a.appspot.com",
	messagingSenderId: "1013888749180",
	appId: "1:1013888749180:web:d1eeac52de7d330b1343f9",
	measurementId: "G-VET2ZEC1YD",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	console.log("Payload : " + payload);
	return self.registration.showNotification("Title", payload);
});
