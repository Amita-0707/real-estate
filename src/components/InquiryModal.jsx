import { useState } from "react";

const InquiryModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-center mt-8">
      <button
        onClick={() => setOpen(true)}
        className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
      >
        Sell property
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Inquiry Form</h2>
            <form className="grid gap-3">
              <input type="text" placeholder="Name" className="p-2 border rounded" />
              <input type="email" placeholder="Email" className="p-2 border rounded" />
              <textarea placeholder="Message" rows="3" className="p-2 border rounded" />
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 border rounded">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryModal;