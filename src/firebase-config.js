import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCM8PqBdI-fLAZHkjuoJtjydgJLF_DKjwk",
  authDomain: "websquids-login.firebaseapp.com",
  projectId: "websquids-login",
  storageBucket: "websquids-login.appspot.com",
  messagingSenderId: "153162093541",
  appId: "1:153162093541:web:527d2e0f5b4110638fd50c",
  measurementId: "G-9MTR42GVWR",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
