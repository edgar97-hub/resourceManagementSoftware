import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyBBCNy7gHDVoFvEWXCkPx-gn8ngfXY9NxA",
  authDomain: "corporatemanagementsoftware.firebaseapp.com",
  projectId: "corporatemanagementsoftware",
  storageBucket: "corporatemanagementsoftware.appspot.com",
  messagingSenderId: "427997647678",
  appId: "1:427997647678:web:d22bd36135f816fbb6126f"

};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
