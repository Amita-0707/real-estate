import React, { useState } from "react";

const SellProperty = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    phone: "",
    email: "",
    propertyTitle: "",
    address: "",
    landArea: "",
    price: "",
    description: "",
  });

  const [propertyImage, setPropertyImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setPropertyImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("ownerName", formData.ownerName);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("propertyTitle", formData.propertyTitle);
    data.append("address", formData.address);
    data.append("landArea", formData.landArea);
    data.append("price", formData.price);
    data.append("description", formData.description);
    if (propertyImage) {
      data.append("propertyImage", propertyImage);
    }

    try {
      const response = await fetch(
        "http://localhost/real-estate-backend/add_property.php",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();
      if (result.success) {
        alert("Your property details have been submitted!");
        setFormData({
          ownerName: "",
          phone: "",
          email: "",
          propertyTitle: "",
          address: "",
          landArea: "",
          price: "",
          description: "",
        });
        setPropertyImage(null);
      } else {
        alert("Submission failed: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during submission.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Sell Your Property
        </h2>

        <input
          type="text"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
          placeholder="Owner's Full Name"
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        <input
          type="text"
          name="propertyTitle"
          value={formData.propertyTitle}
          onChange={handleChange}
          placeholder="Property Title (e.g., 3 BHK Flat)"
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        <input
          type="text"
          name="landArea"
          value={formData.landArea}
          onChange={handleChange}
          placeholder="Land Area (e.g., 5 acres, 2000 sq.ft)"
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Full Property Address"
          rows={2}
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Expected Price (in INR)"
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your property..."
          rows={4}
          className="w-full border rounded-lg px-4 py-2"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Property Image
          </label>
          <input
            type="file"
            name="propertyImage"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Property
        </button>
      </form>
    </div>
  );
};

export default SellProperty;