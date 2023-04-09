import { getApp, getApps, initializeApp } from "@firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAMdoUyDeGrroRJ8ZmcqRVEk3W8sQGwWAA",
  authDomain: "mfa-mr-lt.firebaseapp.com",
  projectId: "mfa-mr-lt",
  storageBucket: "mfa-mr-lt.appspot.com",
  messagingSenderId: "488158327582",
  appId: "1:488158327582:web:f3e33e2bcf0b1fa01d8f0f"
};


let app;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export { app }