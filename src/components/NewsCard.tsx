import React from 'react';
import "./components.css";

interface NewsCardProps {
  title: string;
  description: string;
  image: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, description, image }) => {
  return (
    <div className="bg-white p-6 mb-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
      <img src={image} alt={title} className="mb-4 w-full h-48 object-cover rounded-lg" />
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-2 line-clamp-5">{description}</p>
      <a href="#" className="text-blue-500 hover:underline">
        Read more
      </a>
    </div>
  );
};

export default NewsCard;
