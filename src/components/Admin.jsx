import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router-dom

// ⚠️ CHANGE THIS BASE URL TO MATCH YOUR PHP SERVER LOCATION
const API_BASE_URL = 'http://localhost/real-estate-backend'; 

const Admin = () => {
    // --- State Management ---
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentProperty, setCurrentProperty] = useState(null);
    const [formState, setFormState] = useState({
        ownerName: '', phone: '', email: '', propertyTitle: '',
        address: '', landArea: '', price: '', description: '',
        propertyImage: null, propertyId: null, status: 'available'
    });
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        fetchProperties();
    }, []);

    // --- Core Functionality ---

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/get_properties.php`);
            if (response.data.success) {
                setProperties(response.data.properties);
                setError(null);
            } else {
                // If fetching fails, we should check if they are still logged in (optional advanced check)
                setError('Failed to fetch properties from the server.');
            }
        } catch (err) {
            console.error('API Error:', err);
            setError('Could not connect to the backend server or API failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            // This calls the new admin_logout.php
            const response = await axios.post(`${API_BASE_URL}/admin_logout.php`);
            if (response.data.success) {
                alert('You have been logged out.');
                // Redirect to the login page
                navigate('/admin/login'); // Adjust this path if needed
            } else {
                alert('Logout failed on the server.');
            }
        } catch (err) {
            console.error('Logout Error:', err);
            alert('An error occurred during logout.');
        }
    };

    // --- Form/Modal Handlers (Same as previous, included for completeness) ---

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormState(prev => ({ ...prev, propertyImage: e.target.files[0] }));
    };

    const openAddModal = () => {
        setIsEditMode(false);
        setFormState({
            ownerName: '', phone: '', email: '', propertyTitle: '',
            address: '', landArea: '', price: '', description: '',
            propertyImage: null, propertyId: null, status: 'available'
        });
        setIsModalOpen(true);
    };

    const openEditModal = (property) => {
        setIsEditMode(true);
        setCurrentProperty(property);
        setFormState({
            ownerName: property.ownerName,
            phone: property.phone,
            email: property.email,
            propertyTitle: property.propertyTitle,
            address: property.address,
            landArea: property.landArea,
            price: property.price,
            description: property.description,
            propertyId: property.id,
            status: property.status,
            propertyImage: null 
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentProperty(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const endpoint = isEditMode ? 'update_property.php' : 'add_property.php';
        const formData = new FormData();

        Object.keys(formState).forEach(key => {
            if (key !== 'propertyImage' && formState[key] !== null) {
                formData.append(key, formState[key]);
            }
        });

        if (formState.propertyImage) {
            formData.append('propertyImage', formState.propertyImage);
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/${endpoint}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.success) {
                alert(response.data.message);
                fetchProperties();
                closeModal();
            } else {
                alert(`Error: ${response.data.message}`);
            }
        } catch (err) {
            alert('An error occurred during submission.');
            console.error(err);
        }
    };

    const handleDelete = async (propertyId) => {
        if (!window.confirm('Are you sure you want to delete this property?')) return;

        try {
            const response = await axios.post(`${API_BASE_URL}/delete_property.php`, { propertyId });
            if (response.data.success) {
                alert(response.data.message);
                fetchProperties();
            } else {
                alert(`Error: ${response.data.message}`);
            }
        } catch (err) {
            alert('An error occurred while deleting.');
        }
    };

    const handleMarkSold = async (propertyId, currentStatus) => {
        const newStatus = currentStatus === 'available' ? 'sold' : 'available';
        const action = newStatus === 'sold' ? 'Mark as Sold' : 'Mark as Available';

        if (!window.confirm(`Are you sure you want to ${action}?`)) return;

        try {
            const response = await axios.post(`${API_BASE_URL}/update_property_status.php`, {
                propertyId,
                status: newStatus
            });
            if (response.data.success) {
                alert(response.data.message);
                fetchProperties();
            } else {
                alert(`Error: ${response.data.message}`);
            }
        } catch (err) {
            alert('An error occurred while updating status.');
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading properties...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

    return (
        <div className="admin-dashboard p-8 max-w-7xl mx-auto">
            
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800">🏡 Admin Panel</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200"
                >
                    Logout
                </button>
            </div>
            
            <button
                onClick={openAddModal}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md mb-8 transition duration-200"
            >
                ➕ Add New Property
            </button>

            {/* Property Table and Modal UI (omitted for brevity, assume the previous table structure is here) */}
            
            <div className="shadow-2xl overflow-hidden border-b border-gray-200 rounded-xl">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Owner</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {properties.length > 0 ? (
                            properties.map((property) => (
                                <tr key={property.id} className="hover:bg-gray-50 transition duration-100">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{property.propertyTitle}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{property.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.ownerName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                                            property.status === 'sold' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                            {property.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                        <button 
                                            onClick={() => openEditModal(property)}
                                            className="text-indigo-600 hover:text-indigo-800 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(property.id)}
                                            className="text-red-600 hover:text-red-800 hover:underline"
                                        >
                                            Delete
                                        </button>
                                        <button 
                                            onClick={() => handleMarkSold(property.id, property.status)}
                                            className={`font-semibold hover:underline ${
                                                property.status === 'available' ? 'text-green-600 hover:text-green-800' : 'text-orange-600 hover:text-orange-800'
                                            }`}
                                        >
                                            {property.status === 'available' ? 'Sold?' : 'Available?'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No properties found. Click "Add New Property" to start.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            {/* Modal for Add/Edit Property (omitted for brevity) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-70 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
                    <div className="relative p-8 border w-3/5 max-w-2xl shadow-2xl rounded-xl bg-white transform transition-all duration-300 scale-100">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800">{isEditMode ? '✍️ Edit Property' : '➕ Add New Property'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="hidden" name="propertyId" value={formState.propertyId || ''} />
                            
                            {/* Owner Info */}
                            <div className="grid grid-cols-3 gap-4">
                                <input type="text" name="ownerName" value={formState.ownerName} onChange={handleInputChange} placeholder="Owner Name" required className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                                <input type="tel" name="phone" value={formState.phone} onChange={handleInputChange} placeholder="Phone" required className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                                <input type="email" name="email" value={formState.email} onChange={handleInputChange} placeholder="Email" required className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                            </div>

                            {/* Property Details */}
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" name="propertyTitle" value={formState.propertyTitle} onChange={handleInputChange} placeholder="Property Title (e.g., 3BHK, Land)" required className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                                <input type="text" name="landArea" value={formState.landArea} onChange={handleInputChange} placeholder="Land Area (e.g., 2000 sqft)" required className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            
                            <input type="text" name="address" value={formState.address} onChange={handleInputChange} placeholder="Address" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                            <textarea name="description" value={formState.description} onChange={handleInputChange} placeholder="Description (Optional)" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>

                            {/* Price and Status */}
                            <div className="grid grid-cols-2 gap-4">
                                <input type="number" name="price" value={formState.price} onChange={handleInputChange} placeholder="Price (₹)" required className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                                <select name="status" value={formState.status} onChange={handleInputChange} className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500">
                                    <option value="available">Available</option>
                                    <option value="sold">Sold</option>
                                </select>
                            </div>
                            
                            {/* Image Upload */}
                            <label className="block text-sm font-medium text-gray-700 pt-2">
                                {isEditMode ? 'New Property Image (Optional)' : 'Property Image'}
                            </label>
                            <input type="file" name="propertyImage" onChange={handleFileChange} className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-blue-700 hover:file:bg-violet-100" />
                            {isEditMode && currentProperty && !formState.propertyImage && (
                                <p className="text-sm text-gray-500">Current Image: <a href={currentProperty.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 underline">View Current Image</a></p>
                            )}

                            {/* Actions */}
                            <div className="flex justify-end pt-6">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mr-3 transition duration-150"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-150 shadow-md"
                                >
                                    {isEditMode ? 'Update Property' : 'Add Property'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;