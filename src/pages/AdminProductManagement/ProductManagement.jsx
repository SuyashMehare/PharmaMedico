import { useState } from "react";
import ProductTable from "./ProductTable";
import EditProductModal from "./EditProductModal";
import { useEffect } from "react";
import axios from "axios";
import { ENDPOINTS } from "../../constants/backend_urls"
import { getToken } from "../../utils/localStorage"

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  async function fetchAndSetProducts() {
    const res = await axios.get(ENDPOINTS.product.admin.getAllProducts, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    
    setProducts(res.data.data.products)
  }

  useEffect(() => {
    fetchAndSetProducts();
  }, [])


  const handleSave = async (updatedProduct) => {
    // setProducts((prev) =>
    //   prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    // );
    // setSelectedProduct(null);
      
    const res = await axios.patch(ENDPOINTS.product.admin.updateProduct + '/' + selectedProduct._id, {...updatedProduct}, {
      headers: { Authorization: `Bearer ${getToken()}`}
    });

    if(res.status >= 200 && res.status <= 300) {
        setProducts((val) => val._id == selectedProduct._id ? {
          ...val,
          title: res.title,
          description: res.description,
          brand: res.brand,
          expiry: res.expiry,
          price: res.price,
          currency: res.currency,
          createdAt: res.createdAt
        } : val);
    }
  };

  return (
    <div className="p-6 bg-[#0B1220] min-h-screen text-white">
      <h1 className="text-2xl font-semibold mb-6">Product Management</h1>

      <ProductTable
        products={products}
        onEdit={(product) => setSelectedProduct(product)}
      />

      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ProductManagement;
