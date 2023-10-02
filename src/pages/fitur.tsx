import React, { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import Navbar from '../components/Navbar';
import Jumbotron from '../components/Jumbotron';
import 'tailwindcss/tailwind.css';

interface NewsItem {
  date: string;
  description: string;
  id: string;
  image: string;
  title: string;
}

const Fitur: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://starstecapp-ee82fd6f276e.herokuapp.com/api/campaigns');
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const filteredNews = news
    .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 6);  // Limit to the first 6 items

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-10">
        <div className="flex justify-center mb-6 fontm-montserrat">
          <input
            type="text"
            placeholder="Search articles..."
            className="p-2 border border-gray-300 rounded-lg w-1/2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mx-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((item: NewsItem) => (
            <NewsCard key={item.id} {...item} />
          ))}
        </div>
        <Jumbotron />
      </div>
    </div>
  );
};

export default Fitur;
