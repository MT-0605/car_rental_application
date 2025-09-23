import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getLoggedInUser } from "../utils/auth";

const CarCard = ({ car }) => {
  const user = getLoggedInUser();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="block group">
      <div 
        className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 overflow-hidden border border-white/20 hover:border-purple-200/50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-blue-50/30 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Image Container with Enhanced Effects */}
        <div className="relative overflow-hidden rounded-t-3xl">
          {/* Loading Shimmer */}
          {!imageLoaded && (
            <div className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>
          )}
          
          <img
            src={`http://localhost:5000${car.imageUrl}`}
            alt={`${car.brand} ${car.model}`}
            className={`w-full h-48 object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } group-hover:scale-110 group-hover:brightness-110`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Floating Status Badge with Pulse */}
          <div className="absolute top-4 right-4 z-10">
            {car.available ? (
              <span className="relative inline-flex items-center bg-gradient-to-r from-green-400 to-green-600 text-white text-xs px-3 py-2 rounded-full font-semibold shadow-lg backdrop-blur-sm">
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-300 rounded-full animate-ping opacity-75"></span>
                <span className="relative">Available</span>
              </span>
            ) : (
              <span className="bg-gradient-to-r from-red-400 to-red-600 text-white text-xs px-3 py-2 rounded-full font-semibold shadow-lg backdrop-blur-sm">
                Rented
              </span>
            )}
          </div>
          
          {/* Animated Price Badge */}
          <div className="absolute bottom-4 left-4 z-10">
            <div className="relative">
              <span className="bg-white/95 backdrop-blur-md text-purple-700 text-sm px-4 py-2 rounded-2xl font-bold shadow-xl border border-white/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                <span className="relative z-10">₹{car.price}/day</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
              </span>
            </div>
          </div>

          {/* Hover Overlay with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content with Enhanced Typography */}
        <div className="relative p-6 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors duration-300">
              {car.brand} {car.model}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {car.description || `Premium ${car.brand} ${car.model} - ${car.year} model with exceptional performance`}
            </p>
          </div>

          {/* Modern Car Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ), 
                value: car.year,
                label: "Year"
              },
              { 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ), 
                value: car.location,
                label: "Location"
              },
              { 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ), 
                value: car.fuelType,
                label: "Fuel"
              },
              { 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ), 
                value: car.transmission,
                label: "Transmission"
              }
            ].map((detail, index) => (
              <div 
                key={index}
                className="flex items-center space-x-2 p-2 rounded-xl bg-gray-50/80 hover:bg-purple-50 transition-colors duration-300 group/detail"
              >
                <div className="text-purple-500 group-hover/detail:text-purple-600 transition-colors duration-300">
                  {detail.icon}
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-800 block">{detail.value}</span>
                  <span className="text-xs text-gray-500">{detail.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Category and Seating with Modern Styling */}
          <div className="flex items-center justify-between pt-2">
            <span className="relative inline-flex items-center bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 text-xs px-3 py-2 rounded-2xl font-semibold shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
              <span className="relative">{car.category}</span>
            </span>
            
            <div className="flex items-center space-x-1 text-sm text-gray-600 bg-gray-100/80 px-3 py-2 rounded-2xl">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium">{car.seating}</span>
            </div>
          </div>
          
          {/* Book Now Button */}
          <div className="pt-4">
            <Link to={`/cars/${car._id}`}>
              <button 
                className={`w-full py-3 px-6 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
                  car.available 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105' 
                    : 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed opacity-70'
                }`}
                disabled={!car.available}
              >
                {car.available ? 'Book Now' : 'Currently Unavailable'}
              </button>
            </Link>
          </div>
        </div>

        {/* Subtle Border Animation */}
        <div className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-r from-purple-200 via-blue-200 to-pink-200 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
      </div>
    </div>
  );
};

export default CarCard;