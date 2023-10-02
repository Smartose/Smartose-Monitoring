import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import "./components.css";
import BMICalculator from "../components/BMICalculator";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "tailwindcss/tailwind.css";
import { initializeApp } from "firebase/app";

interface FormData {
  name: string;
  gender: string;
  age: string;
  hipertensi: boolean;
  heartDisease: boolean;
  smokingHistory: boolean;
  bmi: string;
  hba1cLevel: string;
  bloodGlucoseLevel: string;
  firebaseToken: string;
}

interface PersonalInfoFormProps {
  userUID: string;
}

const firebaseConfig = {
  apiKey: "AIzaSyCQmE4ra2ACmoPGLApsz9Fj-D8hBipZdsg",
  authDomain: "smartod-aeafa.firebaseapp.com",
  projectId: "smartod-aeafa",
  storageBucket: "smartod-aeafa.appspot.com",
  messagingSenderId: "840708701077",
  appId: "1:840708701077:web:428b6c4ee793dea36d549c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ userUID }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    gender: "",
    age: "",
    hipertensi: false,
    heartDisease: false,
    smokingHistory: false,
    bmi: "",
    hba1cLevel: "",
    bloodGlucoseLevel: "",
    firebaseToken: "",
  });

  const router = useRouter();

  const checkIfUserLoggedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Jika pengguna belum terautentikasi, arahkan ke halaman login
        router.push("/login");
      }
    });
  };

  useEffect(() => {
    // Memeriksa apakah pengguna sudah login saat komponen dimuat
    checkIfUserLoggedIn();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    // Send the form data to the server
    await sendFormDataToServer(formData);

    // Check if the form data was successfully saved
    const isFormDataSaved = true; // Change this based on your server response

    if (isFormDataSaved) {
      // Navigate to the dashboard after form submission only if the form data was successfully saved
      router.push("/dashboard");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userUID = user.uid;
      console.log("Firebase User UID:", userUID);
      setFormData((prevFormData) => ({
        ...prevFormData,
        firebaseToken: userUID,
      }));
    } else {
      console.log("No Firebase User UID found.");
    }
  }, []);

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
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-purple-500 font-montserrat">
      <div className="flex flex-col max-w-full lg:flex-row lg:max-w-5xl mt-5 mb-5 p-10 bg-white bg-opacity-60 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
        {/* Left Section - Personal Info Form */}
        <div className="lg:w-1/2 mb-4 lg:mb-0 lg:mr-4">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Personal Information
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name :
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            {/* Gender */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="gender"
              >
                Gender :
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  className="mr-2 leading-tight"
                />
                <label className="text-sm" htmlFor="male">
                  Male
                </label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="ml-4 mr-2 leading-tight"
                />
                <label className="text-sm" htmlFor="female">
                  Female
                </label>
              </div>
            </div>
            {/* Age */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="age"
              >
                Age :
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            {/* Hipertensi */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="hipertensi"
              >
                Family History :
              </label>
              <input
                type="checkbox"
                name="hipertensi"
                checked={formData.hipertensi}
                onChange={handleChange}
              />
            </div>
            {/* Heart Disease */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="heartDisease"
              >
                Diet :
              </label>
              <input
                type="checkbox"
                name="heartDisease"
                checked={formData.heartDisease}
                onChange={handleChange}
              />
            </div>
            {/* Smoking History */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="smokingHistory"
              >
                Smoking History :
              </label>
              <input
                type="checkbox"
                name="smokingHistory"
                checked={formData.smokingHistory}
                onChange={handleChange}
              />
            </div>
            {/* BMI */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="bmi"
              >
                BMI :
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number" // Change input type to 'number'
                name="bmi"
                value={formData.bmi}
                onChange={handleChange}
              />
            </div>
            {/* HbA1c Level */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="hba1cLevel"
              >
                HbA1c Level :
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number" // Change input type to 'number'
                name="hba1cLevel"
                value={formData.hba1cLevel}
                onChange={handleChange}
              />
            </div>
            {/* Blood Glucose Level */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="bloodGlucoseLevel"
              >
                Glucose Level :
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number" // Change input type to 'number'
                name="bloodGlucoseLevel"
                value={formData.bloodGlucoseLevel}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transform hover:translate-y-1 transition-transform duration-300"
            >
              Submit
            </button>
          </form>
        </div>
        {/* Right Section - BMI Calculator and Additional Content */}
        <div className="lg:w-1/2 lg:ml-4">
          <BMICalculator />
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Body Mass Index (BMI)</h2>
            <p>
              Body Mass Index (BMI) is a numerical value of a person's weight in
              relation to their height. It is a useful indicator to categorize
              individuals into different weight categories and assess potential
              health risks associated with body weight.
            </p>
            <p className="mt-2">
              BMI is calculated using the formula: BMI = weight (kg) / (height
              (m))^2. The resulting value is then compared to standard BMI
              categories to determine whether an individual is underweight,
              normal weight, overweight, or obese.
            </p>
            <p className="mt-2">Here are the standard BMI categories:</p>
            <ul>
              <li>Underweight: BMI less than 18.5</li>
              <li>Normal weight: BMI 18.5 - 24.9</li>
              <li>Overweight: BMI 25.0 - 29.9</li>
              <li>Obese: BMI 30.0 or higher</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
