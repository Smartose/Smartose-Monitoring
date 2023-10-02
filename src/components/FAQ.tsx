import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./components.css";

const FAQ: React.FC = () => {
  const faqItems = [
    {
      question: 'What is Smartose?',
      answer: 'Smartose is a cutting-edge smartwatch designed to monitor and manage diabetes effectively.',
    },
    {
      question: 'How does Smartose work?',
      answer: 'Smartose uses advanced sensors to continuously measure glucose levels, HbA1C, and ketones in real-time.',
    },
    // Add more FAQ items as needed
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="py-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Frequently Asked Questions</h1>

        <Slider {...settings} className="faq-slider text-center">
          {faqItems.map((item, index) => (
            <div key={index} className="faq-item">
              <h2 className="text-xl font-bold mb-2">{item.question}</h2>
              <p>{item.answer}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FAQ;
