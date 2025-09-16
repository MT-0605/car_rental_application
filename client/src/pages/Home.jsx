import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomerReviews from "../components/Review";
import mainCar from "../assets/front_car.png";
import { getLoggedInUser } from "../utils/auth";

const Home = () => {
  const user = getLoggedInUser();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    setIsVisible(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-white/10 text-4xl animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}>
          🚗
        </div>
        <div className="absolute top-40 right-20 text-white/10 text-3xl animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>
          🏎️
        </div>
        <div className="absolute bottom-32 left-1/4 text-white/10 text-5xl animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}>
          🚙
        </div>
        <div className="absolute top-1/2 right-10 text-white/10 text-3xl animate-bounce" style={{animationDelay: '1.5s', animationDuration: '3.5s'}}>
          🚕
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Animated Title */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Drive the{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
                  Future
                </span>
              </h1>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Experience premium car rentals with cutting-edge technology and unmatched luxury. 
                Your journey starts here with <span className="text-cyan-400 font-semibold">DriveNow</span>.
              </p>
            </div>

            {/* Action Buttons */}
            <div className={`flex flex-col sm:flex-row justify-center gap-6 mb-16 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link
                to="/cars"
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-cyan-500/25 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  <span>Explore Vehicles</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">🚀</span>
                </div>
              </Link>
              <Link
                to="/my-bookings"
                className="group bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-2xl text-lg font-semibold border-2 border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-110 shadow-2xl backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  <span>My Journeys</span>
                  <span className="text-xl group-hover:rotate-12 transition-transform duration-300">📋</span>
                </div>
              </Link>
            </div>

            {/* Featured Car Section */}
            <div className={`relative max-w-5xl mx-auto transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative group">
                {/* Glowing border effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                
                {/* Car image container */}
                <div className="relative bg-black/20 backdrop-blur-xl rounded-3xl p-4 border border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-3xl"></div>
                  <img 
                    src={mainCar} 
                    alt="Premium Vehicle" 
                    className="w-full rounded-2xl transform transition-all duration-700 group-hover:scale-105 relative z-10"
                    style={{ transform: `translateY(${scrollY * 0.1}px)` }}
                  />
                  
                  {/* Floating stats */}
                  <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 transform transition-all duration-500 hover:scale-110">
                    <div className="text-cyan-400 text-2xl font-bold">500+</div>
                    <div className="text-white text-sm">Premium Cars</div>
                  </div>
                  
                  <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 transform transition-all duration-500 hover:scale-110">
                    <div className="text-purple-400 text-2xl font-bold">24/7</div>
                    <div className="text-white text-sm">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                DriveNow?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience the future of car rentals with our innovative platform and premium service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 transform transition-all duration-500 hover:scale-105 hover:bg-white/10">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Lightning Fast</h3>
                <p className="text-gray-300 leading-relaxed">Book your dream car in seconds with our AI-powered instant booking system</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 transform transition-all duration-500 hover:scale-105 hover:bg-white/10">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <span className="text-3xl">💎</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Luxury Fleet</h3>
                <p className="text-gray-300 leading-relaxed">Premium vehicles maintained to perfection with cutting-edge technology</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 transform transition-all duration-500 hover:scale-105 hover:bg-white/10">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <span className="text-3xl">🛡️</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Total Protection</h3>
                <p className="text-gray-300 leading-relaxed">Comprehensive insurance and 24/7 roadside assistance for complete peace of mind</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="text-4xl font-bold text-cyan-400 mb-2 transform transition-all duration-500 group-hover:scale-110">10K+</div>
                <div className="text-gray-300">Happy Customers</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-blue-400 mb-2 transform transition-all duration-500 group-hover:scale-110">500+</div>
                <div className="text-gray-300">Premium Cars</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-purple-400 mb-2 transform transition-all duration-500 group-hover:scale-110">50+</div>
                <div className="text-gray-300">Locations</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-pink-400 mb-2 transform transition-all duration-500 group-hover:scale-110">24/7</div>
                <div className="text-gray-300">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section with dark background */}
      <div className="relative z-10 bg-black/20 backdrop-blur-sm">
        <CustomerReviews />
      </div>

      <style jsx>{`
        @keyframes tilt {
          0%, 50%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(1deg);
          }
          75% {
            transform: rotate(-1deg);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.05);
          }
        }
        
        .animate-tilt {
          animation: tilt 10s infinite linear;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Home;