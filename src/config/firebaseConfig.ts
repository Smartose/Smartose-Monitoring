import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCQmE4ra2ACmoPGLApsz9Fj-D8hBipZdsg",
  authDomain: "smartod-aeafa.firebaseapp.com",
  projectId: "smartod-aeafa",
  storageBucket: "smartod-aeafa.appspot.com",
  messagingSenderId: "840708701077",
  appId: "1:840708701077:web:428b6c4ee793dea36d549c",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
