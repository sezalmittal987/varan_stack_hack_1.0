import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDxUi1lGHCyDVUguRPgu135cqnGHJKmQhk",
    authDomain: "event-management-app-ec6ea.firebaseapp.com",
    projectId: "event-management-app-ec6ea",
    storageBucket: "event-management-app-ec6ea.appspot.com",
    messagingSenderId: "1021706352422",
    appId: "1:1021706352422:web:661e763dc9c031c3c373e7",
    measurementId: "G-Q5H4KB25LW"
  } ;
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
export default storage;