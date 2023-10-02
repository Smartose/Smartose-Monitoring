// ContactUs.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { sendFeedbackToServer } from "../firebase/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEvernote, faInstagram } from "@fortawesome/free-brands-svg-icons";

const ContactUs: React.FC = () => {
    const [feedback, setFeedback] = useState("");
    const [isFeedbackSent, setIsFeedbackSent] = useState(false);
  
    const handleFeedbackChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFeedback(event.target.value);
    };
  
    const handleFeedbackSubmit = async () => {
      try {
        await sendFeedbackToServer(feedback);
        console.log("Feedback submitted successfully!");
        setIsFeedbackSent(true);
        setFeedback(""); // Reset textarea content
      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
    };


  return (
    <div className="bg-gray-900 py-10 text-white flex flex-col md:flex-row justify-center items-center font-montserrat">
      <div className="w-full md:w-1/2 text-center md:text-left px-4 md:pr-10 mb-6 md:mb-0">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faEvernote} className="text-lg" />
            <a
              href="mailto:smartosepkmkc@gmail.com"
              className="text-blue-500 hover:underline"
            >
              smartosepkmkc@gmail.com
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faInstagram} className="text-lg" />
            <a
              href="https://www.instagram.com/smartose.pkmkc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              @smartose.pkmkc
            </a>
          </div>

          <textarea
            className="w-full h-32 bg-gray-800 text-white p-4 rounded"
            placeholder="Your suggestion or feedback..."
            value={feedback}
            onChange={handleFeedbackChange}
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-8 rounded-full font-montserrat"
            onClick={handleFeedbackSubmit}
          >
            Submit
          </motion.button>
          {isFeedbackSent && (
        <div className="text-green-500 mt-2 font-montserrat">
          Feedback submitted successfully!
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;