import firebase from 'firebase';
import 'firebase/auth'
var firebaseConfig = {
    apiKey: "AIzaSyCvqCxMWCiK8qU7xJViaa4zW7uN9thFGGg",
    authDomain: "barman-webdevelopment.firebaseapp.com",
    projectId: "barman-webdevelopment",
    storageBucket: "barman-webdevelopment.appspot.com",
    messagingSenderId: "830696560206",
    appId: "1:830696560206:web:5d4a911e60cbcecacd151f",
  };

  const fb = firebase.initializeApp(firebaseConfig);

  export const db = fb.firestore();
  export const auth = fb.auth();