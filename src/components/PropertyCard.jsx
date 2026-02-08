import React from "react";
import { FaMapMarkerAlt, FaRulerCombined, FaTag, FaCheckCircle } from "react-icons/fa";

const PropertyCard = ({ title, location, area, price, image, status }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
      {status === "sold" && (
        <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 rounded-bl-lg font-semibold z-10">
          SOLD
        </div>
      )}
      <img
        className="w-full h-48 object-cover"
        src={image} // This `src` attribute must use the `image` prop
        alt={title}
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <FaMapMarkerAlt className="mr-2 text-blue-500" />
          <span>{location}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <FaRulerCombined className="mr-2 text-blue-500" />
          <span>{area}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-800 text-lg font-semibold">
            <FaTag className="mr-2 text-green-600" />
            <span>₹{price}</span>
          </div>
          {status === "available" && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
              <FaCheckCircle className="mr-1" />
              Available
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;