import React from "react";

const PropertyDetailsModal = ({ property, onClose }) => {
  if (!property) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {property.property_title}
          </h3>
          <div className="mt-2 px-7 py-3">
            <img
              src={property.property_image} // This line is crucial
              alt={property.property_title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <p className="text-sm text-gray-500 text-left">
              <span className="font-semibold text-gray-700">Location:</span> {property.address}
            </p>
            <p className="text-sm text-gray-500 text-left">
              <span className="font-semibold text-gray-700">Area:</span> {property.land_area}
            </p>
            <p className="text-sm text-gray-500 text-left">
              <span className="font-semibold text-gray-700">Price:</span> ₹{property.price}
            </p>
            {property.description && (
              <p className="text-sm text-gray-500 text-left mt-2">
                <span className="font-semibold text-gray-700">Description:</span> {property.description}
              </p>
            )}
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsModal;