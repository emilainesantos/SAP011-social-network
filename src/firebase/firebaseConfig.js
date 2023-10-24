import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDlJSdWx8JV6RdpZIBCk_UPGvdGwSem6mY",
  authDomain: "social-network-c9640.firebaseapp.com",
  projectId: "social-network-c9640",
  storageBucket: "social-network-c9640.appspot.com",
  messagingSenderId: "344438272377",
  appId: "1:344438272377:web:2d89e171f84bfc29e8bfa8",
  measurementId: "G-J7P77FCQ46"
};

// inicializando o firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

