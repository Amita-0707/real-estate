const Hero = () => {
  return (
    <section className="bg-[#0b1e2d] text-white py-20 px-6 text-center relative">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Discover Your Dream <span className="text-yellow-500">Land</span> or <span className="text-yellow-500">Farm</span>
      </h1>
      <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
        Explore premium land and farm properties curated for those seeking tranquility, investment, and agricultural potential.
      </p>
      <button className="bg-yellow-500 px-6 py-3 rounded-full font-semibold hover:bg-yellow-600 transition">
        Find Properties →
      </button>
      <div className="mt-16">
        <img src="/src/assets/" alt="Featured Property" className="mx-auto rounded-xl shadow-lg w-full max-w-4xl" />
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full shadow-lg font-medium">
          🌾 Farm Land • 📍 Nashik, Maharashtra
        </div>
      </div>
    </section>
  );
};

export default Hero;