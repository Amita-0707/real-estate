const SearchFilter = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-xl shadow mb-8 max-w-4xl mx-auto">
      <h2 className="text-lg font-bold mb-4">Search Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="text" placeholder="Location" className="p-2 border rounded-md" />
        <select className="p-2 border rounded-md">
          <option>Property Type</option>
          <option>Farm</option>
          <option>Land</option>
        </select>
        <input type="number" placeholder="Max Price" className="p-2 border rounded-md" />
      </div>
    </div>
  );
};

export default SearchFilter;