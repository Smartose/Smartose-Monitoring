// pages/index.tsx
import React from "react";
import Login from "./login"; // Import halaman Login

const Home: React.FC = () => {
  return (
    <div>
      <Login /> {/* Menampilkan halaman Login */}
    </div>
  );
};

export default Home;
