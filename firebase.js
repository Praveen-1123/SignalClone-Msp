import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAGdFzjwKr5kyY-TQM725Ij996L2EibINA",
    authDomain: "signal-clone-own.firebaseapp.com",
    projectId: "signal-clone-own",
    storageBucket: "signal-clone-own.appspot.com",
    messagingSenderId: "343785393617",
    appId: "1:343785393617:web:b11ad59387990f2e9464f0"
  };

  let app;

  if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export { db, auth };
