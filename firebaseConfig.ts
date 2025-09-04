import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqqCYar6QcIatJCN1tAxmP9d9BUJu1lK8",
  authDomain: "sknfa-stream.firebaseapp.com",
  projectId: "sknfa-stream",
  storageBucket: "sknfa-stream.appspot.com",
  messagingSenderId: "862183278487",
  appId: "1:862183278487:web:8db709f2243673da8fe6d2",
  measurementId: "G-DSJ1NF3NN7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);