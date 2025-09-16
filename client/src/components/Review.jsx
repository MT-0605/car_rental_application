import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const reviews = [
  {
    name: "Aarav Patel",
    location: "Ahmedabad, India",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    review:
      "DriveNow made my car rental experience smooth and hassle-free. The car was clean and pickup was quick! Highly recommend for anyone looking for reliable car rental services.",
    rentals: 12
  },
  {
    name: "Simran Kaur",
    location: "Chandigarh, India",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    review:
      "Great selection of cars and very professional staff. The booking process was seamless and the car was in perfect condition. Will definitely use DriveNow again!",
    rentals: 8
  },
  {
    name: "Rahul Verma",
    location: "Pune, India",
    avatar: "https://i.pravatar.cc/150?img=8",
    rating: 5,
    review:
      "Affordable prices and seamless booking process. The customer service is exceptional and the cars are well-maintained. I will use DriveNow again for sure.",
    rentals: 25
  },
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    review:
      "Amazing experience! The app is user-friendly and the car delivery was on time. The vehicle was spotless and the staff was very helpful throughout the process.",
    rentals: 18
  },
  {
    name: "Vikram Singh",
    location: "Delhi, India",
    avatar: "https://i.pravatar.cc/150?img=15",
    rating: 5,
    review:
      "Best car rental service I've ever used. Competitive pricing, excellent customer support, and a wide variety of vehicles to choose from. Highly recommended!",
    rentals: 35
  },
  {
    name: "Anjali Desai",
    location: "Bangalore, India",
    avatar: "https://i.pravatar.cc/150?img=20",
    rating: 5,
    review:
      "Outstanding service! The booking was quick, the car was perfect, and the return process was smooth. DriveNow has set a new standard for car rentals.",
    rentals: 22
  },
];

const CustomerReviews = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    AOS.init({ 
      duration: 800, 
      once: false,
      easing: 'ease-out-cubic'
    });
    
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const StarRating = ({ rating, size = 'w-5 h-5' }) => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`${size} relative overflow-hidden`}
        >
          <svg
            className={`${size} transition-all duration-300 ${
              i < rating 
                ? 'text-yellow-400 drop-shadow-sm' 
                : 'text-gray-200'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {i < rating && (
            <div 
              className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full opacity-20 animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.1),transparent_70%)]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-float" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-float-delayed" />
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-xl animate-float-slow" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-20" data-aos="fade-down">
          <div className="inline-flex items-center justify-center p-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-8">
            <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white font-semibold text-sm tracking-wide">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Customer Love</span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
            What Our{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Customers
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full transform scale-x-0 animate-scale-x" />
            </span>{' '}
            Say
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our satisfied customers have to say about their{' '}
            <span className="font-semibold text-indigo-600">DriveNow</span> experience.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center space-x-8 mt-12">
            {[
              { label: 'Happy Customers', value: '50K+', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
              { label: 'Average Rating', value: '4.9★', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
              { label: 'Countries', value: '15+', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
                <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Reviews Grid */}
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] p-8 border border-white/20 overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
              
              {/* Content */}
              <div className="relative z-10">

                {/* Rating with Animation */}
                <div className="mb-6">
                  <StarRating rating={review.rating} size="w-6 h-6" />
                </div>

                {/* Quote Icon */}
                <div className="mb-6">
                  <svg className="w-8 h-8 text-indigo-200 group-hover:text-indigo-300 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 leading-relaxed mb-8 text-base font-medium group-hover:text-gray-800 transition-colors duration-300">
                  {review.review}
                </p>

                {/* Customer Info */}
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-14 h-14 rounded-2xl object-cover border-3 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                      {review.name}
                    </h4>
                    <p className="text-sm text-gray-500 font-medium flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {review.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating particles */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-60 animate-ping transition-opacity duration-300" />
              <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-60 animate-ping transition-opacity duration-300" style={{ animationDelay: '0.2s' }} />
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-24" data-aos="fade-up" data-aos-delay="200">
          <div className="bg-white/80 backdrop-blur-sm rounded-4xl shadow-2xl border border-white/20 p-12 max-w-4xl mx-auto relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-pink-50/50 rounded-4xl" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mb-8 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Ready to Experience{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  DriveNow?
                </span>
              </h3>
              
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of satisfied customers who trust DriveNow for their car rental needs. 
                Experience premium service, competitive prices, and exceptional support.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link
                  to="/cars"
                  className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl shadow-indigo-500/25"
                >
                  <span className="relative z-10">Browse Cars</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                
                <Link
                  to="/learn-more"
                  className="group px-10 py-5 bg-white/80 backdrop-blur-sm border-2 border-indigo-200 hover:border-indigo-300 text-indigo-600 hover:text-indigo-700 rounded-2xl text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Learn More
                  <svg className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(90deg); }
        }
        
        @keyframes scale-x {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .animate-scale-x {
          animation: scale-x 1.5s ease-out 0.5s both;
        }
        
        .rounded-4xl {
          border-radius: 2rem;
        }
      `}</style>
    </section>
  );
};

export default CustomerReviews;