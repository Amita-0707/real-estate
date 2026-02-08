import React, { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import PropertyDetailsModal from "./PropertyDetailsModal";

const PropertyListings = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost/real-estate-backend/get_properties.php"
        );
        const data = await response.json();
        
        if (data.properties) {
          setProperties(data.properties);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const openModal = (property) => {
    setSelectedProperty(property);
  };

  const closeModal = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Property Listings</h1>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-lg">Loading properties...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div
                key={property.id}
                onClick={() => openModal(property)}
                className="cursor-pointer"
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
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p className="text-lg text-gray-600">No properties available at the moment.</p>
            </div>
          )}
        </div>
      )}
      
      {selectedProperty && (
        <PropertyDetailsModal property={selectedProperty} onClose={closeModal} />
      )}
    </div>
  );
};

export default PropertyListings;