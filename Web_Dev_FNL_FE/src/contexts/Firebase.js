import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC1g5XGiG6DvHsFwi7hLwyy4flRfSlqb-k",
    authDomain: "forget-normal-life.firebaseapp.com",
    projectId: "forget-normal-life",
    storageBucket: "forget-normal-life.appspot.com",
    messagingSenderId: "1008139745658",
    appId: "1:1008139745658:web:a55abb8f00069ae9e27ec3",
    measurementId: "G-93KQCQJ6KX"
  };

  const app = initializeApp(firebaseConfig) 
  const storage = getStorage(app)

  export { storage, app };