import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./components.css";
import "tailwindcss/tailwind.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useRouter } from "next/router"; // Menggunakan useRouter dari Next.js
import { getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore";

interface DataPoint {
  timestamp: number;
  HR: number;
  HRV: number;
  SDNN: number;
  SDANN: number;
  pNN50: number;
  Keton: number;
}

const firebaseConfig = {
  apiKey: "AIzaSyCQmE4ra2ACmoPGLApsz9Fj-D8hBipZdsg",
  authDomain: "smartod-aeafa.firebaseapp.com",
  projectId: "smartod-aeafa",
  storageBucket: "smartod-aeafa.appspot.com",
  messagingSenderId: "840708701077",
  appId: "1:840708701077:web:428b6c4ee793dea36d549c",
};

firebase.initializeApp(firebaseConfig);

const UserInfo: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const auth = getAuth();
  const db = getFirestore();
  const router = useRouter();

  const handleLogout = () => {
    // Firebase logout logic
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Hapus seluruh informasi pengguna dari localStorage
        localStorage.clear();
        router.push("/login"); // Navigasi kembali ke halaman login
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userUID = user.uid;
        console.log("userUID:", userUID); // Log the Firebase UID
        fetchUserInfo(userUID); // Panggil fetchUserInfo dengan Firebase UID
      }
    }, );
    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [auth]); // Perubahan disini, tambahkan auth sebagai dependency

  const fetchUserInfo = (firebaseToken: string) => {
    fetch(`http://localhost:3001/getDataByFirebaseToken/${firebaseToken}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  };

  return (
    <div className="md:w-1/4 p-6 bg-gray-200 font-montserrat">
      <h2 className="text-xl font-bold mb-4">User Information</h2>
      {userData ? (
        <>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Age:</strong> {userData.age}
          </p>
          <p>
            <strong>BMI:</strong> {userData.bmi}
          </p>
          <p>
            <strong>Gender:</strong> {userData.gender}
          </p>
          <p>
            <strong>Hipertensi:</strong>{" "}
            {userData.hipertensi === 1 ? "Yes" : "No"}
          </p>
          <p>
            <strong>Heart Disease:</strong>{" "}
            {userData.heartDisease === 1 ? "Yes" : "No"}
          </p>
          <p>
            <strong>Smoking History:</strong>{" "}
            {userData.smokingHistory === 1 ? "Yes" : "No"}
          </p>
          <p>
            <strong>HbA1c Level:</strong> {userData.hba1cLevel}
          </p>
          <p>
            <strong>Blood Glucose Level:</strong> {userData.bloodGlucoseLevel}
          </p>
        </>
      ) : (
        <p>Loading user information...</p>
      )}
      <button
        className="bg-red-500 text-white py-2 px-4 mt-4 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

const EMGMonitoring: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [isDeepLearningProcessing, setIsDeepLearningProcessing] =
    useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsDeepLearningProcessing(true);
      setTimeout(() => {
        setIsDeepLearningProcessing(false);
      }, 1000);

      setData((prevData) => {
        const newData: DataPoint[] = [
          ...prevData,
          {
            timestamp: new Date().getTime(),
            HR: Math.floor(Math.random() * 100),
            HRV: Math.random() * 50,
            SDNN: Math.random() * 20,
            SDANN: Math.random() * 15,
            pNN50: Math.random() * 100,
            Keton: Math.random() * 10,
          },
        ];

        return newData.slice(-10);
      });
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <UserInfo />
      <div className="md:w-3/4 p-6">
        <h1 className="text-2xl mb-4 font-montserrat">
          Smartose Monitoring Page
        </h1>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(unixTime) =>
                new Date(unixTime).toLocaleTimeString()
              }
              tick={{ fontSize: 7 }}
            />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleTimeString()}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="HR"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="HRV"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="SDNN"
              stroke="#FF0000"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="SDANN"
              stroke="#00FF00"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="pNN50"
              stroke="#FFD700"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="Keton"
              stroke="#800080"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EMGMonitoring;
