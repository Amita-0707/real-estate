import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "./PropertyCard";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost/real-estate-backend/get_properties.php"
        );
        const data = await response.json();

        if (data.success && data.properties) {
          setProperties(data.properties);
        } else {
          console.error(
            "Failed to fetch properties:",
            data.message || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Filter properties
  const filteredProperties = properties.filter((property) => {
    if (filter === "all") return true;
    if (filter === "available") return property.status !== "sold";
    if (filter === "sold") return property.status === "sold";
    return true;
  });

  const closeModal = () => setSelectedProperty(null);

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">All Properties</h1>

      {/* Filter Controls */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setFilter("all")}
          >
            All Properties
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              filter === "available"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setFilter("available")}
          >
            Available
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              filter === "sold"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setFilter("sold")}
          >
            Sold
          </button>
        </div>
      </div>

      {/* Properties Display */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-lg">Loading properties...</p>
        </div>
      ) : (
        <>
          <p className="text-center mb-6">
            Showing {filteredProperties.length} of {properties.length}{" "}
            properties
          </p>

          {filteredProperties.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600">
                No properties found matching your filter.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="relative cursor-pointer transition duration-300"
                  onClick={() =>
                    property.status !== "sold" && setSelectedProperty(property)
                  }
                >
                  {/* SOLD Label */}
                  {property.status === "sold" && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded z-10">
                      SOLD
                    </span>
                  )}

                  {/* Property Card */}
                  <div
                    className={`transition duration-300 ${
                      property.status === "sold"
                        ? "opacity-60 blur-[1px] pointer-events-none"
                        : "hover:scale-[1.02]"
                    }`}
                  >
                    <PropertyCard
                      title={property.propertyTitle}
                      location={property.address}
                      price={property.price}
                      area={property.landArea}
                      image={property.imageUrl}
                      status={property.status}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal for Property Details */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>

            <img
              src={selectedProperty.imageUrl}
              alt={selectedProperty.propertyTitle}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />

            <h2 className="text-2xl font-bold mb-2">
              {selectedProperty.propertyTitle}
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>Location:</strong> {selectedProperty.address}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Area:</strong> {selectedProperty.landArea} sq. ft.
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Price:</strong> ₹{selectedProperty.price}
            </p>
            {selectedProperty.description && (
              <p className="text-gray-600 mb-4">
                <strong>Description:</strong> {selectedProperty.description}
              </p>
            )}

            <div className="text-right">
              <button
                onClick={() =>
                  navigate("/contact", {
                    state: { property: selectedProperty },
                  })
                }
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                I’m Interested
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProperties;