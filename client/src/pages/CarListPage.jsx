import React, { useState, useEffect } from "react";
import CarCard from "../components/CarCard";
import { getLoggedInUser } from "../utils/auth";
import { carsAPI } from "../utils/api";

const CarListPage = () => {
  const user = getLoggedInUser();
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPrice, setFilterPrice] = useState("all");
  const [filterAvailability, setFilterAvailability] = useState("all"); // New filter for availability
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await carsAPI.getAllCars();
        console.log("Fetched cars:", res.data);
        setCars(res.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError("Failed to load cars. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Filter and sort cars
  const filteredCars = cars
    .filter((car) => {
      const matchesSearch = car.brand.toLowerCase().includes(search.toLowerCase()) ||
        car.model.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory = filterCategory === "all" || car.category === filterCategory;
      
      const matchesPrice = filterPrice === "all" || 
        (filterPrice === "low" && car.price <= 1000) ||
        (filterPrice === "medium" && car.price > 1000 && car.price <= 2000) ||
        (filterPrice === "high" && car.price > 2000);
      
      // New filter for availability
      const matchesAvailability = filterAvailability === "all" || 
        (filterAvailability === "available" && car.available) ||
        (filterAvailability === "unavailable" && !car.available);
      
      return matchesSearch && matchesCategory && matchesPrice && matchesAvailability;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.brand.localeCompare(b.brand);
        default:
          return 0;
      }
    });

  const categories = ["all", ...new Set(cars.map(car => car.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 relative overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Modern Header with Glass Effect */}
      <div className="relative bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-pink-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Premium Car Collection
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover our curated selection of exceptional vehicles, each one meticulously chosen for your perfect journey.
            </p>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Search and Filters Panel */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 rounded-3xl"></div>
          
          <div className="relative">
            {/* Search Section with Modern Styling */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Search Your Perfect Ride
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by brand, model, or dream car..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-purple-200/50 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-300 text-gray-800 placeholder-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-purple-200/50 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Price Range
                </label>
                <div className="relative">
                  <select
                    value={filterPrice}
                    onChange={(e) => setFilterPrice(e.target.value)}
                    className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-purple-200/50 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="all">All Prices</option>
                    <option value="low">Under ₹1,000</option>
                    <option value="medium">₹1,000 - ₹2,000</option>
                    <option value="high">Over ₹2,000</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Availability Filter - New */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Availability
                </label>
                <div className="relative">
                  <select
                    value={filterAvailability}
                    onChange={(e) => setFilterAvailability(e.target.value)}
                    className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-purple-200/50 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="all">All Cars</option>
                    <option value="available">Available Only</option>
                    <option value="unavailable">Unavailable Only</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* View Mode Toggle */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  View Mode
                </label>
                <div className="flex bg-purple-100/80 rounded-2xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl transition-all duration-300 ${
                      viewMode === "grid"
                        ? "bg-white shadow-lg text-purple-600"
                        : "text-purple-500 hover:text-purple-600"
                    }`}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl transition-all duration-300 ${
                      viewMode === "list"
                        ? "bg-white shadow-lg text-purple-600"
                        : "text-purple-500 hover:text-purple-600"
                    }`}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    List
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Sort Options */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-semibold text-gray-800">Sort by:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "name", label: "Name", icon: "🔤" },
                    { value: "price-low", label: "Price: Low to High", icon: "💰" },
                    { value: "price-high", label: "Price: High to Low", icon: "💎" }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                        sortBy === option.value
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                          : "bg-white/80 text-gray-700 hover:bg-purple-50 border border-purple-200/50"
                      }`}
                    >
                      <span>{option.icon}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Results Summary */}
        <div className="flex items-center justify-between mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
            <p className="text-gray-700 font-medium">
              <span className="text-2xl font-bold text-purple-600">{filteredCars.length}</span>
              <span className="mx-2">of</span>
              <span className="text-lg font-semibold">{cars.length}</span>
              <span className="ml-2">premium vehicles</span>
            </p>
          </div>
          
          {filteredCars.length > 0 && (
            <div className="text-sm text-gray-600 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
              Showing results for your search
            </div>
          )}
        </div>

        {/* Enhanced Error Message */}
        {error && (
          <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/50 rounded-3xl backdrop-blur-sm">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Modern Loading State */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-600 rounded-full animate-spin animate-reverse"></div>
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Loading Premium Vehicles</h3>
              <p className="text-gray-600">Curating the perfect cars for you...</p>
            </div>
          </div>
        ) : filteredCars.length === 0 ? (
          /* Enhanced Empty State */
          <div className="text-center py-20">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl mx-auto flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No vehicles match your criteria</h3>
              <p className="text-gray-600 max-w-md mx-auto leading-relaxed mb-6">
                Try adjusting your search terms or filters to discover more amazing vehicles in our collection.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setFilterCategory("all");
                  setFilterPrice("all");
                  setFilterAvailability("all");
                  setSortBy("name");
                }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Clear All Filters
              </button>
            </div>
          </div>
        ) : (
          /* Enhanced Cars Grid with Animation */
          <div className={`
            ${viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
              : "space-y-6"
            }
          `}>
            {filteredCars.map((car, index) => (
              <div 
                key={car._id}
                className="opacity-0 animate-fadeIn"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <CarCard car={car} />
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out infinite;
        }
        
        .animate-reverse {
          animation-direction: reverse;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}
      </style>
    </div>
  );
}

export default CarListPage;