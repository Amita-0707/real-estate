const MapSection = () => {
  return (
    <section className="mt-12 px-6">
      <h2 className="text-2xl font-bold mb-4">Explore on Map</h2>
      <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609942635!2d72.74109818103416!3d19.082197839211702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63c3d5ff2e9%3A0x2aa088d0dff4b078!2sNashik%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1717750928933!5m2!1sen!2sin"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map"
        ></iframe>
      </div>
    </section>
  );
};

export default MapSection;