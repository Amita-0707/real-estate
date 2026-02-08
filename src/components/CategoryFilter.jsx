const CategoryFilter = () => {
  return (
    <div className="flex justify-center gap-4 mt-6 mb-8">
      {["All", "Land", "Farm", "Commercial", "Residential"].map((cat) => (
        <button
          key={cat}
          className="px-4 py-2 border border-gray-300 rounded-full hover:bg-yellow-500 hover:text-white transition"
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;