import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";
import { app } from "../config/firebaseConfig";
import "./components.css";

interface UserData {
  name: string;
  age: number;
  bmi: number;
  gender: string;
  hipertensi: boolean;
  heartDisease: boolean;
  smokingHistory: boolean;
  hba1cLevel: number;
  bloodGlucoseLevel: number;
}

const UserInfo: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        router.push("/login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userUID = user.uid;
        console.log("userUID:", userUID);
        fetchUserInfo(userUID);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const fetchUserInfo = (firebaseToken: string) => {
    fetch(`http://localhost:3001/getDataByFirebaseToken/${firebaseToken}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  };

  return (
    <div className="md:w-1/4 p-6 bg-gray-800 font-montserrat border border-gray-600 shadow-xl flex flex-col items-center text-white custom-card">
      <div className="mb-4">
        {auth.currentUser && auth.currentUser.photoURL ? (
          <img
            src={auth.currentUser.photoURL}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-400"></div>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-4">User Information</h2>
      {userData ? (
        <div className="text-left">
          <p className="mb-2">
            <strong>Name:</strong> {userData.name}
          </p>
          <p className="mb-2">
            <strong>Age:</strong> {userData.age}
          </p>
          <p className="mb-2">
            <strong>BMI:</strong> {userData.bmi}
          </p>
          <p className="mb-2">
            <strong>Gender:</strong> {userData.gender}
          </p>
          <p className="mb-2">
            <strong>Hipertensi:</strong> {userData.hipertensi ? "Yes" : "No"}
          </p>
          <p className="mb-2">
            <strong>Heart Disease:</strong>{" "}
            {userData.heartDisease ? "Yes" : "No"}
          </p>
          <p className="mb-2">
            <strong>Smoking History:</strong>{" "}
            {userData.smokingHistory ? "Yes" : "No"}
          </p>
          <p className="mb-2">
            <strong>HbA1c Level:</strong> {userData.hba1cLevel}
          </p>
          <p className="mb-2">
            <strong>Blood Glucose Level:</strong> {userData.bloodGlucoseLevel}
          </p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
      <button
        className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 mt-6 rounded-lg hover:from-red-600 hover:to-pink-600 hover:shadow-lg transform hover:scale-105 transition-transform font--montserrat"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default UserInfo;
