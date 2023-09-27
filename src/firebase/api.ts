// src/firebase/api.ts
import { getFirestore } from "firebase/firestore";
import { app } from '../config/firebaseConfig';
import { useRouter } from 'next/router';

const router = useRouter();
const db = getFirestore(app);

const sendFormDataToServer = async (formData: FormData) => {
  try {
    const response = await fetch("http://localhost:3001/saveFormData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData,
      }),
    });

    if (response.ok) {
      console.log("Form data sent successfully!");
      // Redirect to the dashboard
      router.push("/dashboard");
    } else {
      console.error("Failed to send form data:", response.statusText);
    }
  } catch (error) {
    console.error("Error sending form data:", error);
  }
};

export { db, sendFormDataToServer };
