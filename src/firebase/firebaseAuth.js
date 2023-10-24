import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import {app} from "./firebaseConfig.js"

export function verifyRegister(email, password){
  const auth = getAuth(app);
  return createUserWithEmailAndPassword(auth, email, password)
}

export function verifyLogin(email, password){
  const auth = getAuth(app);
  return signInWithEmailAndPassword(auth, email, password)
}

