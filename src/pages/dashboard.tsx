import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import UserInfo from "../components/UserInfo"; // Sesuaikan dengan path yang benar
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
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import dari firebase/auth
import "tailwindcss/tailwind.css";

interface UserInfoProps {
  firebaseToken: string;
}

interface DataPoint {
  timestamp: number;
  HR: number;
  HRV: number;
  SDNN: number;
  SDANN: number;
  pNN50: number;
  Keton: number;
}

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [data, setData] = useState<DataPoint[]>([]);
  const [isDeepLearningProcessing, setIsDeepLearningProcessing] =
    useState(false);

  const [firebaseToken, setFirebaseToken] = useState<string | null>(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Pengguna telah diotentikasi
        const firebaseToken = user.uid; // Gunakan UID sebagai token
        setFirebaseToken(firebaseToken); // Simpan token di state
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

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
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Tombol menu untuk memunculkan/menyembunyikan sidebar */}
      <button
        className="md:hidden block px-4 py-2 text-gray-800"
        onClick={toggleSidebar}
      >
        ☰ Menu
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />
      <div className="md:w-3/4 p-6 font-montserrat">
        <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-3/5 mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-gray-800">
              Realtime Monitoring
            </h1>
            <ResponsiveContainer width="100%" height={300}>
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
                  tick={{ fontSize: 10, fill: "#333" }}
                />
                <YAxis tick={{ fontSize: 10, fill: "#333" }} />
                <Tooltip
                  labelFormatter={(value) =>
                    new Date(value).toLocaleTimeString()
                  }
                />
                <Legend verticalAlign="top" height={36} />
                <Line
                  type="monotone"
                  dataKey="HR"
                  stroke="#ff7300"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="HRV"
                  stroke="#387908"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="Keton"
                  stroke="#800080"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-2/5">
            {/* User Info Card */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                User Information
              </h2>
              <button className="text-blue-500 font-semibold">Edit</button>
            </div>
            <div className="mt-8">
              {/* Display user information here */}
              <UserInfo firebaseToken={firebaseToken ?? ""} />
            </div>
          </div>
          {/* Add more cards for additional content */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
