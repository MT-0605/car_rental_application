import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { carsAPI } from "../utils/api";

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Add this inside the useEffect that fetches the car
  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await carsAPI.getCarById(id);
        setCar(res.data);
      } catch (err) {
        console.error("Error fetching car:", err);
        setError("Failed to load car details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    if (id) {
      fetchCar();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 pt-20">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-blue-600 rounded-full animate-spin animate-reverse mx-auto"></div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-xl border border-white/20">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Loading Premium Vehicle</h3>
            <p className="text-gray-600">Preparing your car details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 pt-20">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-3xl mx-auto flex items-center justify-center mb-8">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-xl border border-white/20 max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Unable to Load Vehicle</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/cars')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Cars
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 pt-20">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mx-auto flex items-center justify-center mb-8">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
            </svg>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-xl border border-white/20 max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Vehicle Not Found</h3>
            <p className="text-gray-600 mb-6">The vehicle you're looking for doesn't exist in our collection.</p>
            <button
              onClick={() => navigate('/cars')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Explore Our Fleet
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 relative overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm">
          <button
            onClick={() => navigate('/cars')}
            className="text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
          >
            Cars
          </button>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-600">{car.brand} {car.model}</span>
        </nav>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="flex flex-col xl:flex-row">
            {/* Left Side - Car Details */}
            <div className="xl:w-2/3 p-8 lg:p-12">
              {/* Car Image Section with Enhanced Design */}
              <div className="relative mb-8 group">
                <div className="relative overflow-hidden rounded-3xl">
                  {/* Loading Shimmer */}
                  {!imageLoaded && (
                    <div className="w-full h-96 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-3xl">
                      <div className="w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer rounded-3xl" />
                    </div>
                  )}
                  
                  <img
                    src={`http://localhost:5000${car.imageUrl}`}
                    alt={`${car.brand} ${car.model}`}
                    className={`w-full h-96 object-cover transition-all duration-700 rounded-3xl ${
                      imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
                    } group-hover:scale-105`}
                    onLoad={() => setImageLoaded(true)}
                  />
                  
                  {/* Enhanced Status Badge */}
                  <div className="absolute top-6 right-6 z-10">
                    {car.available ? (
                      <div className="relative inline-flex items-center">
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-300 rounded-full animate-ping opacity-75"></span>
                        <span className="relative bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg backdrop-blur-sm border border-green-300/50">
                          Available Now
                        </span>
                      </div>
                    ) : (
                      <span className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg backdrop-blur-sm border border-red-300/50">
                        Currently Rented
                      </span>
                    )}
                  </div>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Car Title and Description */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      {car.brand} {car.model}
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                      {car.description || `Experience the premium ${car.brand} ${car.model} - ${car.year} model with exceptional performance and luxury features.`}
                    </p>
                  </div>
                </div>

                {/* Enhanced Price Display */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100/50 rounded-3xl p-6 mb-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5"></div>
                  <div className="relative flex items-center justify-between">
                    <div>
                      <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                        ₹{car.price}
                        <span className="text-lg font-medium text-gray-600 ml-2">/day</span>
                      </div>
                      <p className="text-sm text-gray-600">Competitive daily rate</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modern Car Specifications Grid */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Vehicle Specifications</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { 
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      ), 
                      label: "Brand", 
                      value: car.brand, 
                      color: "from-blue-500 to-blue-600" 
                    },
                    { 
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      ), 
                      label: "Model", 
                      value: car.model, 
                      color: "from-purple-500 to-purple-600" 
                    },
                    { 
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ), 
                      label: "Year", 
                      value: car.year, 
                      color: "from-indigo-500 to-indigo-600" 
                    },
                    { 
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      ), 
                      label: "Fuel Type", 
                      value: car.fuelType, 
                      color: "from-green-500 to-green-600" 
                    },
                    { 
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      ), 
                      label: "Transmission", 
                      value: car.transmission, 
                      color: "from-orange-500 to-orange-600" 
                    },
                    { 
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      ), 
                      label: "Seating", 
                      value: `${car.seating} seats`, 
                      color: "from-pink-500 to-pink-600" 
                    },
                    { 
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      ), 
                      label: "Category", 
                      value: car.category, 
                      color: "from-teal-500 to-teal-600" 
                    },
                    { 
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ), 
                      label: "Location", 
                      value: car.location, 
                      color: "from-red-500 to-red-600" 
                    },
                    { 
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ), 
                      label: "Status", 
                      value: car.available ? 'Available' : 'Not Available', 
                      color: car.available ? "from-green-500 to-green-600" : "from-red-500 to-red-600"
                    }
                  ].map((spec, index) => (
                    <div 
                      key={spec.label}
                      className="group bg-white/80 backdrop-blur-sm border border-gray-100/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${spec.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {spec.icon}
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 font-medium">{spec.label}</div>
                          <div className="text-lg font-bold text-gray-900">{spec.value}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Enhanced Booking Form */}
            <div className="xl:w-1/3 bg-gradient-to-br from-purple-50/50 to-blue-50/50 p-8 lg:p-12 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5"></div>
              <div className="relative">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Book This Vehicle</h3>
                    <p className="text-gray-600">Reserve your premium ride today</p>
                  </div>
                  <BookingForm car={car} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out infinite;
        }
        
        .animate-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  );
};

export default CarDetailPage;