import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./components.css";
import ReactTypingEffect from "react-typing-effect";

const typingDelay = 20;
// Function to generate a hash from a string

const generateHash = (input: string) => {
  let hash = 0;
  if (input.length === 0) {
    return hash.toString();
  }
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
};

const developers = [
  {
    name: "Aisy Al Fawwaz",
    role: "Full Stack & Deep Learning Engineer",
    description:
      "Passionate creating efficient and scalable web applications and deeply involved in technologies in deep learning",
    image: "https://images.alphacoders.com/132/1328866.png",
  },
  {
    name: "Diaz Samsun Alif",
    role: "Hardware & Product Engineer",
    description:
      "Dedicated to designing and engineering hardware components and creating seamless experiences",
    // Generate a unique hash for this developer
    image: `https://images5.alphacoders.com/132/1328865.png`,
  },
  {
    name: "Ach Jazilul Qolbi",
    role: "Hardware & Software Engineer",
    description:
      "Focused on both hardware and software development, working to integrate and optimize the performance aspects",
    // Generate a unique hash for this developer
    image: `https://images.alphacoders.com/754/754523.jpg`,
  },
  {
    name: "Anita Firmanti",
    role: "Documentation",
    description:
      "Committed to creating clear and comprehensive documentation to facilitate smooth user experiences",
    // Generate a unique hash for this developer
    image: `https://images3.alphacoders.com/132/1329280.png`,
  },
  {
    name: "Anasah Zulfah",
    role: "Product Manager",
    description:
      "Responsible for overseeing and managing the entire product development lifecycle",
    // Generate a unique hash for this developer
    image: `https://images6.alphacoders.com/133/1331314.png`,
  },
  {
    name: "Ferry Efendi, MSc., PhD",
    role: "Supervisor",
    description:
      "Responsible for overseeing and managing the entire product development lifecycle",
    // Generate a unique hash for this developer
    image: `https://wallpapercave.com/wp/wp4785033.jpg`,
  },
];

const Team: React.FC = () => {
  useEffect(() => {
    const typingElement = document.getElementById("typing");
    if (typingElement) {
      setTimeout(() => {
        typingElement.classList.add("typing-animation");
      }, typingDelay);
    }
  }, []);

  return (
    <div className="py-10 text-center">
      <h1 className="text-4xl font-bold mb-6 text-white font-montserrat">
        <ReactTypingEffect
          text={["Meet Our Development Team ..."]}
          speed={100} // Typing speed (ms)
        />
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-6 md:mx-20">
        {developers.map((developer, index) => (
          <motion.div
            key={index}
            className="rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="h-40 overflow-hidden">
              <img
                src={developer.image}
                alt={developer.name}
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="p-2">
              <p className="font-bold text-lg text-white font-montserrat">
                {developer.name}
              </p>
              <p className="text-red-600 font-bold mt-2 font-montserrat">
                {developer.role}
              </p>
              <p className="text-white mt-2 font-montserrat">
                {developer.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Team;
