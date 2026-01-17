import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ENDPOINTS } from "../constants/backend_urls";
import { getToken } from "../utils/localStorage";
import PriceHistoryChart from "../components/charts/PriceHistoryChart";
import { store } from "../redux/store";
import { addToCart } from "../redux/slices/CartSlice";
import { useLocation, useNavigate } from "react-router-dom";


export default function ProductDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  const [productDetail, setProductDetail] = useState(null);
  const params = useParams();

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate(-1); // fallback
    }
  };

  function addToCartHandler() {
    store.dispatch(addToCart({
      productId: productDetail._id,
      productName: productDetail.title,
      productPrice: productDetail.price
    }));
    toast.success(`${product.title} added to cart`);
  }

  async function getSingleProduct() {
    const productId = params.productId;

    const res = await axios.get(
      ENDPOINTS.product.user.getProductById + "/" + productId,
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );

    setProductDetail(res.data.data);
  }

  useEffect(() => {
    getSingleProduct();
  }, []);

  if (!productDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading product...
      </div>
    );
  }

  const latestPrice =
    productDetail.priceHistory?.length
      ? productDetail.priceHistory.at(-1).price
      : productDetail.price;

  return (
    <div className="p-6 bg-[#0B1220] min-h-screen text-white space-y-8">
      <button
        onClick={handleBack}
        className="text-sm text-gray-400 hover:text-white flex items-center gap-2 mb-4"
      >
        ← Back
      </button>

      {/* Product Info */}
      <div className="bg-gray-900 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Image Section */}
        <div className="rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center">
          {productDetail.banner_url ? (
            <img
              src={productDetail.banner_url}
              alt={productDetail.title}
              className="w-full h-full max-h-[360px] object-cover"
            />
          ) : (
            <div className="text-gray-500 text-sm">
              No image available
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">
            {productDetail.title}
          </h1>

          <p className="text-sm text-gray-400">
            Brand:{" "}
            <span className="text-gray-200">
              {productDetail.brand}
            </span>
          </p>

          <p className="text-gray-400 text-sm">
            {productDetail.description}
          </p>

          <div className="text-3xl font-bold text-green-400">
            ₹{latestPrice.toLocaleString("en-IN")}
          </div>

          <p className="text-xs text-gray-500">
            Expiry:{" "}
            {new Date(productDetail.expiry).toLocaleDateString("en-IN")}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button className="flex-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl py-3 text-sm transition" onClick={addToCartHandler}>
              Add to Cart
            </button>

            <button className="flex-1 bg-green-600 hover:bg-green-500 rounded-xl py-3 text-sm font-medium transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Price History */}
      <div>
        <h2 className="text-lg font-medium mb-4">
          Price History
        </h2>

        {productDetail.priceHistory?.length ? (
          <PriceHistoryChart priceHistory={productDetail.priceHistory} />
        ) : (
          <div className="h-[350px] flex items-center justify-center rounded-xl bg-gray-900 text-gray-400 text-sm">
            No price history available
          </div>
        )}
      </div>
    </div>
  );
}
