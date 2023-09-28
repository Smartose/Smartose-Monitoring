import React, { useEffect, useState } from 'react';
import UserInfo from '../components/UserInfo';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './components.css';
import 'tailwindcss/tailwind.css';

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
  const [data, setData] = useState<DataPoint[]>([]);
  const [isDeepLearningProcessing, setIsDeepLearningProcessing] = useState(false);

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
      <UserInfo />
      <div className="md:w-3/4 p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl mb-4 font-bold text-blue-600 font-montserrat">
            Smartose Monitoring Page
          </h1>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(unixTime) => new Date(unixTime).toLocaleTimeString()}
                tick={{ fontSize: 10, fill: '#333' }}
              />
              <YAxis tick={{ fontSize: 10, fill: '#333' }} />
              <Tooltip labelFormatter={(value) => new Date(value).toLocaleTimeString()} />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" dataKey="HR" stroke="#ff7300" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="HRV" stroke="#387908" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="SDNN" stroke="#ff0000" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="SDANN" stroke="#00ff00" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="pNN50" stroke="#ffd700" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Keton" stroke="#800080" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
