// BMICalculator.tsx
import React, { useState, ChangeEvent } from "react";

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState("");

  const calculateBMI = () => {
    // BMI calculation formula: BMI = weight (kg) / (height (m))^2
    if (height && weight) {
      const heightMeters = parseFloat(height) / 100; // Convert height to meters
      const weightKg = parseFloat(weight);

      const bmiValue = weightKg / (heightMeters * heightMeters);
      setBMI(bmiValue.toFixed(2)); // Round BMI to 2 decimal places
    }
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">BMI Calculator</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Height (cm):
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number" // Change input type to 'number'
          value={height}
          onChange={handleHeightChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Weight (kg):
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number" // Change input type to 'number'
          value={weight}
          onChange={handleWeightChange}
        />
      </div>
      <button
        onClick={calculateBMI}
        className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transform hover:translate-y-1 transition-transform duration-300"
      >
        Calculate BMI
      </button>
      {bmi && <p className="mt-4">Your BMI is: {bmi}</p>}
    </div>
  );
};

export default BMICalculator;
