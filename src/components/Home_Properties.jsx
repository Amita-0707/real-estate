import React from "react";
import { Link } from "react-router-dom";

const PropertyServiceCard = ({ title, description, img, link }) => {
  return (
    <div className="bg-[#1C2D37] text-white rounded-2xl p-6 w-80 shadow-lg text-center hover:scale-105 transition-transform duration-300">
      <img src={img} alt={title} className="w-20 h-20 mx-auto mb-4" />
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-sm mb-4">{description}</p>
      <Link
        to={link}
        className="inline-block bg-white text-black rounded-full p-2 hover:bg-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 38 38"
          fill="none"
        >
          <path
            d="M37.7489 18.3913L29.1127 9.75502C28.8025 9.39276 28.2573 9.35053 27.895 9.66083C27.5327 9.97106 27.4905 10.5163 27.8008 10.8785L35.0544 18.1408H0.863594C0.386673 18.1408 0 18.5274 0 19.0044C0 19.4814 0.386673 19.868 0.863594 19.868H35.0544L27.895 27.0274C27.5327 27.3377 27.4905 27.8829 27.8008 28.2451C28.1111 28.6074 28.6563 28.6496 29.0185 28.3393L37.7489 19.6089C38.0837 19.2721 38.0837 18.7281 37.7489 18.3913Z"
            fill="black"
          />
        </svg>
      </Link>
    </div>
  );
};

const Properties = () => {
  return (
    <div className="py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">
        Our Property Services
      </h1>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Sticker Image */}
        <div className="flex-shrink-0">
          <img
            src="src/business.png"
            alt="Real Estate Sticker"
            className="w-44 h-44 object-contain"
          />
        </div>

        {/* Cards wrapper */}
        <div className="flex flex-row flex-wrap justify-center gap-8">
          <PropertyServiceCard
            title="Buy a Property"
            description="Find and purchase properties easily."
            img="https://cityscapewp.wowtheme7.com/wp-content/uploads/2025/01/home5-service-icon-01.png"
            link="/buyproperty"
          />
          <PropertyServiceCard
            title="Sell a Property"
            description="Sell your property with trusted agents and best value."
            img="https://cdn-icons-png.flaticon.com/512/1828/1828959.png"
            link="/sell"
          />
        </div>
      </div>
    </div>
  );
};

export default Properties;
