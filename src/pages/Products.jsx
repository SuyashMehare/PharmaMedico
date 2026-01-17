import axios from "axios";
import { useEffect, useState, useMemo, useCallback } from "react";
import { ENDPOINTS } from "../constants/backend_urls";
import { getToken } from "../utils/localStorage";
import ProductCard from "../components/products/ProductCard";
import { Loader2, Search, Filter, X, SlidersHorizontal, Grid3x3, List } from "lucide-react";
import Input from "../components/others/Input";
import Button from "../components/others/Button";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState("grid"); // grid or list
    const [sortBy, setSortBy] = useState("default"); // default, name-asc, name-desc, price-asc, price-desc
    const [showFilters, setShowFilters] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

    const fetchAllProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await axios.get(ENDPOINTS.product.user.getAllProducts, {
                headers: { Authorization: `Bearer ${getToken()}` }
            });
            setProducts(res.data.data.products);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch products");
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);

    // Get unique brands for filter
    const availableBrands = useMemo(() => {
        const brands = [...new Set(products.map(p => p.brand))];
        return brands.sort();
    }, [products]);

    // Get price range
    const productPriceRange = useMemo(() => {
        if (products.length === 0) return { min: 0, max: 0 };
        const prices = products.map(p => p.price || 0);
        return {
            min: Math.floor(Math.min(...prices)),
            max: Math.ceil(Math.max(...prices))
        };
    }, [products]);

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let result = products.filter(product => {
            // Search filter
            const matchesSearch = !searchQuery ||
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchQuery.toLowerCase());

            // Brand filter
            const matchesBrand = selectedBrands.length === 0 ||
                selectedBrands.includes(product.brand);

            // Price filter
            const price = product.price || 0;
            const matchesPrice = price >= priceRange.min && price <= priceRange.max;

            return matchesSearch && matchesBrand && matchesPrice;
        });

        // Sort
        switch (sortBy) {
            case "name-asc":
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "name-desc":
                result.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case "price-asc":
                result.sort((a, b) => (a.price || 0) - (b.price || 0));
                break;
            case "price-desc":
                result.sort((a, b) => (b.price || 0) - (a.price || 0));
                break;
            default:
                break;
        }

        return result;
    }, [products, searchQuery, selectedBrands, priceRange, sortBy]);

    const toggleBrand = (brand) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedBrands([]);
        setPriceRange({ min: 0, max: Infinity });
        setSortBy("default");
    };

    const hasActiveFilters = searchQuery || selectedBrands.length > 0 ||
        priceRange.min > 0 || priceRange.max < Infinity || sortBy !== "default";

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Our Products
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'product' : 'products'} available
                    </p>
                </div>

                {/* View Toggle */}
                <div className="flex gap-2">
                    <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                    >
                        <Grid3x3 className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                    >
                        <List className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Search and Filters Bar */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search by name, description, or brand..."
                        className="pl-10 pr-10 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                <div className="flex gap-2">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="default">Sort by: Default</option>
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                    </select>

                    <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                        className="relative"
                    >
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Filters
                        {(selectedBrands.length > 0 || priceRange.min > 0 || priceRange.max < Infinity) && (
                            <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">
                                {selectedBrands.length + (priceRange.min > 0 || priceRange.max < Infinity ? 1 : 0)}
                            </span>
                        )}
                    </Button>

                    {hasActiveFilters && (
                        <Button variant="ghost" size="sm" onClick={clearFilters}>
                            <X className="mr-1 h-4 w-4" />
                            Clear
                        </Button>
                    )}
                </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Brand Filter */}
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Brands</h3>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {availableBrands.map(brand => (
                                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedBrands.includes(brand)}
                                            onChange={() => toggleBrand(brand)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{brand}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range Filter */}
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Price Range</h3>
                            <div className="space-y-3">
                                <div className="flex gap-3">
                                    <Input
                                        type="number"
                                        placeholder="Min"
                                        value={priceRange.min || ""}
                                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) || 0 }))}
                                        className="w-full"
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Max"
                                        value={priceRange.max === Infinity ? "" : priceRange.max}
                                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) || Infinity }))}
                                        className="w-full"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Available range: ${productPriceRange.min} - ${productPriceRange.max}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400" />
                </div>
            )}

            {/* Error State */}
            {error && !loading && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-4 rounded-lg mb-6 flex items-center justify-between">
                    <span>{error}</span>
                    <Button variant="ghost" size="sm" onClick={fetchAllProducts}>
                        Retry
                    </Button>
                </div>
            )}

            {/* Products Display */}
            {!loading && !error && (
                <>
                    {filteredAndSortedProducts.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                                <Search className="h-12 w-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                No products found
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                {searchQuery
                                    ? `No results for "${searchQuery}"`
                                    : "Try adjusting your filters"
                                }
                            </p>
                            {hasActiveFilters && (
                                <Button onClick={clearFilters}>
                                    Clear all filters
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className={
                            viewMode === "grid"
                                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                                : "flex flex-col gap-4"
                        }>
                            {filteredAndSortedProducts.map(product => (
                                <ProductCard key={product._id} product={product} viewMode={viewMode} />
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Empty state for no products at all */}
            {!loading && !error && products.length === 0 && (
                <div className="text-center py-16">
                    <div className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                        <Filter className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No products available
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Check back later for new products
                    </p>
                    <Button onClick={fetchAllProducts}>
                        Refresh
                    </Button>
                </div>
            )}
        </div>
    );
}