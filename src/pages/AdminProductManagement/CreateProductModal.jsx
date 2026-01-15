import { useState } from 'react';
import { ENDPOINTS } from '../../constants/backend_urls';
import axios from 'axios';
import { getToken } from '../../utils/localStorage';

const CreateProductModal = ({ onClose }) => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        brand: '',
        expiry: '',
        price: '',
    });

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.append('banner', image);            
        
        try {
            setLoading(true);

            const res = await axios.post(ENDPOINTS.product.admin.createSingleProduct, formData, {
                headers: { Authorization: `Bearer ${getToken()}` }
            });

            console.log("create product : ",res);
            
            if (!res.data.success || !res.status) throw new Error('Failed to create product');

            onClose();
        } catch (err) {
            console.error(err);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#111827] w-full max-w-lg rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">Create Product</h2>

                <form onSubmit={handleSubmit} className="space-y-4" encType='multipart/form-data'>
                    <input
                        name="title"
                        placeholder="Title"
                        className="w-full bg-[#0B1220] p-2 rounded"
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        className="w-full bg-[#0B1220] p-2 rounded"
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="brand"
                        placeholder="Brand"
                        className="w-full bg-[#0B1220] p-2 rounded"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="date"
                        name="expiry"
                        className="w-full bg-[#0B1220] p-2 rounded"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        className="w-full bg-[#0B1220] p-2 rounded"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-700"
                        >
                            Cancel
                        </button>

                        <button
                            disabled={loading}
                            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500"
                        >
                            {loading ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProductModal;
