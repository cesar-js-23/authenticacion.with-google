import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBn86Nc2qO9gXri-U-zBm2-YbWT2BhFY2U",
  authDomain: "autenticar-c6b31.firebaseapp.com",
  projectId: "autenticar-c6b31",
  storageBucket: "autenticar-c6b31.appspot.com",
  messagingSenderId: "322378668361",
  appId: "1:322378668361:web:14f13803cb8281368ca298",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
