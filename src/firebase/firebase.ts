import * as firebase from "firebase";

// import * as firebase from "firebase"

// const firebaseConfig = {
//     apiKey: "AIzaSyAWYuvkVPG-htfbE1WJf1lWj05XUo2mpm4",
// 	authDomain: "dis-count-f5f2a.firebaseapp.com",
// 	projectId: "dis-count-f5f2a",
// 	storageBucket: "dis-count-f5f2a.appspot.com",
// 	messagingSenderId: "1013888749180",
// 	appId: "1:1013888749180:web:d1eeac52de7d330b1343f9",
// 	measurementId: "G-VET2ZEC1YD",
// }

// const firebaseApp = firebase.initializeApp(firebaseConfig);

//oldone
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

// Initialize Firebase
const app = firebase.default.initializeApp(firebaseConfig);
const analytics = firebase.default.analytics(app);

export default firebase;
