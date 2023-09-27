import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../config/firebaseConfig";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const handleGoogleLogin = () => {
  signInWithPopup(auth, provider).catch((error) => {
    console.error("Login error:", error);
  });
};

export { auth, handleGoogleLogin };
