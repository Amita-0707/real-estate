import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // <--- Ensure this is correctly imported
import axios from 'axios';

// IMPORTANT: Ensure this URL is correct for your backend server (e.g., XAMPP/WAMP)
const API_BASE_URL = 'http://localhost/real-estate-backend';

const ContactForm = () => {
    // THIS IS THE LINE THAT WAS GIVING THE ERROR
    const location = useLocation();
    const property = location.state?.property; // <--- This line is correctly handling the case where state is null/undefined

    // 1. State Management: Keep track of form data and status
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(''); // To show success/error message
    const [loading, setLoading] = useState(false);

    // 2. Submission Handler: Stops redirect and sends data via AJAX
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setStatus('');
        setLoading(true);

        const formData = {
            name,
            email,
            message,
            property: property ? property : null,
        };

        try {
            const response = await axios.post(`${API_BASE_URL}/send_inquiry.php`, formData);
            
            if (response.data.success) {
                setStatus(response.data.message); 
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setStatus(`❌ Error: ${response.data.message || 'Unknown error occurred on the server.'}`);
            }
        } catch (err) {
            console.error('Contact form submission error:', err);
            
            let errorMsg = 'Could not connect to the server.';
            
            if (err.response && err.response.data && err.response.data.message) {
                errorMsg = err.response.data.message;
            } 
            else if (err.message.includes('JSON')) {
                 errorMsg = "Mail sent, but response failed. Please check server output (PHP/JSON).";
            } else {
                 errorMsg = err.message || 'An unknown error occurred.';
            }

            setStatus(`❌ Error: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="p-8 bg-gray-100 rounded-xl shadow-md max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            
            {/* Display Status Message */}
            {status && (
                <div className={`p-4 mb-4 rounded-md text-sm ${status.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {status}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid gap-4"> 
                <input
                    type="text"
                    placeholder="Your Name"
                    className="p-3 border rounded-md"
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    className="p-3 border rounded-md"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Your Message"
                    rows="4"
                    className="p-3 border rounded-md"
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    required
                ></textarea>

                {/* Auto-filled property details */}
                {property && (
                   <div className="bg-white border rounded-md p-4 mt-2 text-sm text-gray-700">
                        <h3 className="font-semibold mb-1 text-lg">Interested Property:</h3>
                        <p><strong>Title:</strong> {property.propertyTitle}</p>
                        <p><strong>Location:</strong> {property.address}</p>
                        <p><strong>Area:</strong> {property.landArea} sq. ft.</p>
                        <p><strong>Price:</strong> ₹{property.price}</p>
                   </div>
                )}

                <button
                    type="submit"
                    disabled={loading} 
                    className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 mt-3 disabled:opacity-50"
                >
                    {loading ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </section>
    );
};

export default ContactForm;