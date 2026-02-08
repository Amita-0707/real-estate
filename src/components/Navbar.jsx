import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-6 bg-[#0b1e2d] text-white">
      <div className="text-2xl font-bold">Shivansh Property</div>
      <div className="space-x-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/buyproperty" className="hover:underline">Properties</Link>
        <Link to="/propertylistings" className="hover:underline">Property Listings</Link>
        <Link to="/allproperties" className="hover:underline">All Properties</Link>
        <Link to="/about" className="hover:underline">About Us</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
        <Link to="/admin" className="hover:underline">Admin</Link>
      </div>
     
    </nav>
  );
};

export default Navbar;