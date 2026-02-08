import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
// ... other imports
import PropertyCard from "./components/PropertyCard";
import CategoryFilter from "./components/CategoryFilter";
import InquiryModal from "./components/InquiryModal";
import MapSection from "./components/MapSection";

// Import the new/updated components for the Admin system
import AdminLogin from "./components/AdminLogin"; 
import Admin from "./components/Admin";
import AdminRoute from "./components/AdminRoute"; // 👈 NEW IMPORT for route protection

import Properties from "./components/Home_Properties";
import BuyProperty from "./components/BuyProperty";
import Contact from "./components/Contact";
import SellProperty from "./components/SellProperty";
import AllProperties from "./components/AllProperties";
import PropertyListings from "./components/PropertyListings";
import About from "./components/About";

// Home page content
const Home = () => (
  <>
    <Hero />
    <div className="px-6">
      <Properties />
      <MapSection />
    </div>
  </>
);

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/buyproperty" element={<BuyProperty />} />
        <Route path="/sell" element={<SellProperty />} />
        <Route path="/allproperties" element={<AllProperties />} />
        <Route path="/propertylistings" element={<PropertyListings />} />
        <Route path="/about" element={<About />} />
        
        {/* ------------------------------------------------------------------ */}
        {/* Admin Routes */}
        {/* 1. Login Page (Public) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* 2. Admin Dashboard (Protected using AdminRoute) */}
        <Route 
          path="/admin/dashboard" 
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          } 
        />
        {/* Direct access to Admin component */}
        <Route path="/admin" element={<Admin />} /> 
        
        {/* ------------------------------------------------------------------ */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
