import React from 'react';

const Jumbotron: React.FC = () => {
  return (
    <div className="flex justify-center mt-10">
      <div className="max-w-3xl bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="relative aspect-w-16 aspect-h-9">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/vLLp5b6FlyM"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">Smartose Product Overview</h2>
          <p className="text-gray-700">
            Watch this video to learn more about the exciting features of Smartose, the ultimate smartwatch for managing diabetes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
