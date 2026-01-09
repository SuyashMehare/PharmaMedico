import { useState } from "react";

const EditProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#111827] w-full max-w-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

        <div className="space-y-3">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 rounded bg-[#1F2937] border border-gray-700"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 rounded bg-[#1F2937] border border-gray-700"
          />

          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="w-full p-2 rounded bg-[#1F2937] border border-gray-700"
          />

          <input
            type="date"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#1F2937] border border-gray-700"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 rounded bg-[#1F2937] border border-gray-700"
          />

          <input
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            placeholder="Currency"
            className="w-full p-2 rounded bg-[#1F2937] border border-gray-700"
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isDeleted"
              checked={formData.isDeleted}
              onChange={handleChange}
            />
            Mark as Deleted
          </label>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
