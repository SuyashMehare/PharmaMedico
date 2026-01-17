import { Link } from "react-router-dom";
import Button from "../others/Button";
import { IndianRupee, ShoppingCart, Zap, Bell, BellOff } from "lucide-react";
import { store } from "../../redux/store";
import { addToCart } from "../../redux/slices/CartSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ENDPOINTS } from "../../constants/backend_urls";
import { getToken } from "../../utils/localStorage";

const IMAGE_ADDR = 'https://i.guim.co.uk/img/media/20491572b80293361199ca2fc95e49dfd85e1f42/0_236_5157_3094/master/5157.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=fc5fad5b6c2b545b7143b9787d0c90b1';

export default function ProductCard({ product }) {
    const [priceAlert, setPriceAlert] = useState(product?.isSubscribed || false);

    function addToCartHandler() {
        store.dispatch(addToCart({
            productId: product._id,
            productName: product.title,
            productPrice: product.price
        }));
        toast.success(`${product.title} added to cart`);
    }

    function checkoutHandler() {
        console.log('Checkout initiated for', product._id);
    }

    async function togglePriceAlert() {
        setPriceAlert(!priceAlert);
        let endpoint = priceAlert ? ENDPOINTS.product.user.unSubscribeProduct :
            ENDPOINTS.product.user.subscribeProduct;

        const res = await axios.post(endpoint + '/' + product._id,
            { productId: product._id },
            { headers: { Authorization: `Bearer ${getToken()}` } }
        );

        const status = res.status;
        if (status == 201 || status == 200) {
            setPriceAlert(!priceAlert);
        }


        toast.info(`Price alert ${priceAlert ? 'removed' : 'added'} for ${product.title}`);
    }

    return (
        <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700 max-w-xs w-full mx-auto">
            {/* Product Image */}
            <div className="relative group">
                <img
                    src={product.banner_url || IMAGE_ADDR}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-md group-hover:opacity-90 transition-opacity"
                />
                <button
                    onClick={togglePriceAlert}
                    className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    aria-label={priceAlert ? "Remove price alert" : "Set price alert"}
                    title={priceAlert ? "Remove price alert" : "Get notified if price drops"}
                >
                    {priceAlert ? (
                        <Bell className="text-yellow-500" size={18} />
                    ) : (
                        <BellOff className="text-gray-500" size={18} />
                    )}
                </button>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-2 flex-grow">
                <h3 className="font-bold text-lg text-gray-900 dark:text-zinc-100 line-clamp-2">
                    {product.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-zinc-300 line-clamp-3">
                    {product.description}
                </p>
                <p className="text-sm font-medium text-gray-700 dark:text-zinc-200">
                    <span className="font-semibold">Brand: </span>
                    {product.brand}
                </p>

                <div className="flex items-center mt-1">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                        {product.price}
                    </span>
                    <IndianRupee className="ml-1" size={18} strokeWidth={2.5} />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-2">
                <Button
                    icon={<ShoppingCart size={18} />}
                    label="Add to Cart"
                    className="flex-1"
                    variant="addToCart"
                    onClick={addToCartHandler}
                    size="md"
                />
                <Button
                    icon={<Zap size={18} />}
                    label="Buy Now"
                    className="flex-1"
                    variant="buyNow"
                    onClick={checkoutHandler}
                    size="md"
                />
            </div>

            <Link
                to={`/products/${product._id}`}
                state={{ from: location.pathname + location.search }}
                className="text-sm text-center text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
                View details
            </Link>
        </div>
    );
}