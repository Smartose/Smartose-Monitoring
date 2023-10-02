// src/firebase/api.ts
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from '../config/firebaseConfig';

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
    } else {
      console.error("Failed to send form data:", response.statusText);
    }
  } catch (error) {
    console.error("Error sending form data:", error);
  }
};

const sendFeedbackToServer = async (feedback: string) => {
  try {
    const feedbackCollection = collection(db, 'feedback');
    const feedbackData = { feedback };

    await addDoc(feedbackCollection, feedbackData);
    console.log("Feedback submitted successfully!");
  } catch (error) {
    console.error("Error submitting feedback:", error);
  }
};

export { db, sendFormDataToServer, sendFeedbackToServer };