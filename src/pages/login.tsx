import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import "./components.css";
import FAQ from "../components/FAQ";
import Team from "../components/Team";
import ContactUs from "../components/Contact";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar"; // Import the Navbar component
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import homepageImage from "../images/homepage.png"; // Adjust the path based on your project structure
import { auth, handleGoogleLogin } from "../helpers/authHelpers"; // Correct import for auth
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Login: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userUID = user.uid;
        console.log("Login successful. User UID:", userUID);

        // Check if the user has logged in before
        const userRef = doc(db, "users", userUID);

        try {
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            // User has logged in before, navigate to dashboard
            router.push("/dashboard");
          } else {
            // User is logging in for the first time, navigate to forms
            const tokenRef = doc(db, "users", userUID);
            const tokenDoc = await getDoc(tokenRef);

            if (tokenDoc.exists()) {
              console.log("firebaseToken exists in the database");
              router.push("/dashboard");
            } else {
              console.log("firebaseToken does not exist in the database");
              router.push("/forms");
            }
          }
        } catch (error) {
          console.error("Error checking database for firebaseToken:", error);
        }

        setLoading(false);
      } else {
        setLoading(false);
        console.log("User signed out");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleGoogleLoginClick = () => {
    handleGoogleLogin();
  };

  if (loading) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-purple-500 text-white font-montserrat">
        <div className="mt-0 mb-2 text-center">
          <div className="flex flex-col items-center justify-center">
            <Image
              src={homepageImage}
              alt="Smartose"
              width={120}
              height={120}
            />
            <h1 className="text-4xl font-bold mb-4 text-center">
              Smartose: Smartwatch Diabetes Monitor 3 in 1
            </h1>
          </div>
          <p className="text-lg">
            Monitor and analyze glucose levels, HbA1C, and ketones in real-time
            with Smartose.
          </p>
        </div>
        <p>Masuk dengan</p>
        <div
          className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-bounce mt-8"
          onClick={handleGoogleLoginClick}
        >
          <FontAwesomeIcon
            icon={faGoogle}
            style={{ fontSize: 24, color: "white" }}
          />
        </div>
      </div>

      {/* Gradient divider */}
      <div className="h-20 bg-gradient-to-b from-purple-500 to-purple-500" />

      {/* Team section */}
      <div className="bg-gradient-to-b from-purple-500 to-blue-500">
        <Team />
      </div>

      {/* ContactUs */}
      <ContactUs />
    </div>
  );
};

export default Login;





