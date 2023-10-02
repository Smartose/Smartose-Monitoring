import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBirthdayCake, faRulerVertical, faVenusMars, faHeart, faLungs, faSmoking, faTint, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { app } from '../config/firebaseConfig';
import './components.css';

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

interface UserInfoProps {
  firebaseToken: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ firebaseToken }) =>  {
  const [userData, setUserData] = useState<UserData | null>(null);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        router.push('/login');
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  useEffect(() => {
    fetchUserInfo(firebaseToken);
  }, [firebaseToken]);

  const fetchUserInfo = (firebaseToken: string) => {
    fetch(`http://localhost:3001/getDataByFirebaseToken/${firebaseToken}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.error('Error fetching user data:', error));
  };

  return (
    <div className="p-1 font-montserrat flex flex-col items-left text-gray-800 custom-card">
      {userData ? (
      <div className="text-left">
      <p className="mb-2">
        <strong><FontAwesomeIcon icon={faUser} /> Name:</strong> {userData.name}
      </p>
      <p className="mb-2">
        <strong><FontAwesomeIcon icon={faBirthdayCake} /> Age:</strong> {userData.age}
      </p>
      <p className="mb-2">
        <strong><FontAwesomeIcon icon={faRulerVertical} /> BMI:</strong> {userData.bmi}
      </p>
      <p className="mb-2">
        <strong><FontAwesomeIcon icon={faVenusMars} /> Gender:</strong> {userData.gender}
      </p>
      <p className="mb-2">
        <strong><FontAwesomeIcon icon={faTint} /> Hipertensi:</strong> {userData.hipertensi ? 'Yes' : 'No'}
      </p>
      <p className="mb-2">
        <strong><FontAwesomeIcon icon={faHeart} /> Heart Disease:</strong> {userData.heartDisease ? 'Yes' : 'No'}
      </p>
      <p className="mb-2">
        <strong><FontAwesomeIcon icon={faLungs} /> Smoking History:</strong> {userData.smokingHistory ? 'Yes' : 'No'}
      </p>
      <p className="mb-2">
        <strong><FontAwesomeIcon icon={faTachometerAlt} /> HbA1c Level:</strong> {userData.hba1cLevel}
      </p>
      <p className="mb-2">
        <strong><FontAwesomeIcon icon={faTachometerAlt} /> Blood Glucose Level:</strong> {userData.bloodGlucoseLevel}
      </p>
    </div>
    
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default UserInfo;
