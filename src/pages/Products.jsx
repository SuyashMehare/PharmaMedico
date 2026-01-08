import axios from "axios";
import { useEffect, useState } from "react";
import { ENDPOINTS } from "../constants/backend_urls";
import { getToken } from "../utils/localStorage";
import ProductCard from "../components/products/ProductCard";
import { Loader2, Search, Filter } from "lucide-react";
import Input from  "../components/others/Input";
import Button from "../components/others/Button";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);

    async function fetchAllProducts() {
        try {
            setLoading(true);
            const res = await axios.get(ENDPOINTS.product.user.getAllProducts, {
                headers: {Authorization: `Bearer ${getToken()}`}
            });
            setProducts(res.data.data.products);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch products");
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header and Search */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Our Products
                </h1>
                
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search products..."
                            className="pl-10 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="shrink-0">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                    </Button>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-12 w-12 animate-spin text-gray-500 dark:text-gray-400" />
                </div>
            )}

            {/* Error State */}
            {error && !loading && (
                <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
                    {error}
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="ml-4"
                        onClick={fetchAllProducts}
                    >
                        Retry
                    </Button>
                </div>
            )}

            {/* Products Grid */}
            {!loading && !error && (
                <>
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 dark:text-gray-400 text-lg">
                                No products found {searchQuery && `for "${searchQuery}"`}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Empty state for no products at all */}
            {!loading && !error && products.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                        No products available at the moment
                    </p>
                    <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={fetchAllProducts}
                    >
                        Refresh
                    </Button>
                </div>
            )}
        </div>
    );
}