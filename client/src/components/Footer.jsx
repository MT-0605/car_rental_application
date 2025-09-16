import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
} from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-xl animate-float-slow" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.1),transparent_60%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Enhanced Company Info */}
          <div className="lg:col-span-1 group">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                  DriveNow
                </span>
                <span className="text-xs font-medium text-gray-400 -mt-1 tracking-wide">
                  Premium Rentals
                </span>
              </div>
            </div>

            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              Drive in style with our premium car rental service. Experience
              <span className="text-indigo-400 font-semibold"> luxury</span>,
              <span className="text-purple-400 font-semibold"> comfort</span>, and
              <span className="text-pink-400 font-semibold"> reliability</span> with every journey.
            </p>

            {/* Enhanced Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: FaFacebookF, href: "https://www.facebook.com/tank.meet.3958", color: "from-blue-600 to-blue-700" },
                { icon: FaTwitter, href: "#", color: "from-sky-500 to-sky-600" },
                { icon: FaInstagram, href: "#", color: "from-pink-500 to-rose-600" },
                { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/meet-tank-a46622309/", color: "from-blue-600 to-indigo-700" }
              ].map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative w-12 h-12 bg-gradient-to-br ${social.color} rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1`}
                  >
                    <IconComponent className="text-white text-lg group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div className="group">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full mr-4"></div>
              <h4 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">
                Quick Links
              </h4>
            </div>
            <ul className="space-y-4">
              {[
                { to: "/home", label: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
                { to: "/cars", label: "Browse Cars", icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" },
                { to: "/list-car", label: "List Your Car", icon: "M12 6v6m0 0v6m0-6h6m-6 0H6" },
                { to: "/my-bookings", label: "My Bookings", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 p-3 rounded-2xl hover:bg-white/5 hover:backdrop-blur-sm transform hover:translate-x-2"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:from-indigo-500/40 group-hover:to-purple-500/40 transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                      </svg>
                    </div>
                    <span className="font-medium text-lg">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Support */}
          <div className="group">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-4"></div>
              <h4 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                Support
              </h4>
            </div>
            <ul className="space-y-4">
              {[
                { to: "/help", label: "Help Center", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                { to: "/contact", label: "Contact Support", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" },
                { to: "/terms-of-service", label: "Terms of Service", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                { to: "/privacy-policy", label: "Privacy Policy", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 p-3 rounded-2xl hover:bg-white/5 hover:backdrop-blur-sm transform hover:translate-x-2"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:from-purple-500/40 group-hover:to-pink-500/40 transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                      </svg>
                    </div>
                    <span className="font-medium text-lg">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Contact Info */}
          <div className="group">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-rose-600 rounded-full mr-4"></div>
              <h4 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors duration-300">
                Get In Touch
              </h4>
            </div>
            <div className="space-y-6">
              {[
                { icon: FaPhone, text: "+91 99041137201", color: "from-emerald-500 to-teal-600" },
                { icon: FaEnvelope, text: "drivenow@gmail.com", color: "from-blue-500 to-indigo-600" },
                { icon: FaMapMarkerAlt, text: "DriveNow, Nikol, Ahmedabad", color: "from-purple-500 to-pink-600" }
              ].map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <div key={index} className="group flex items-start p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 transform hover:translate-x-2">
                    <div className={`w-12 h-12 bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                      <IconComponent className="text-white text-lg" />
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-lg font-medium leading-relaxed">
                        {contact.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="relative mt-16 pt-8">
          {/* Separator Line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
              <p className="text-gray-400 text-lg font-medium">
                © {new Date().getFullYear()} DriveNow. All rights reserved.
              </p>
              <div className="flex items-center space-x-2 text-gray-500">
                <span>Made with</span>
                <svg className="w-5 h-5 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>by DriveNow Team</span>
              </div>
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex space-x-6">
                {["Terms of Service", "Privacy Policy", "Cookie Policy"].map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-white text-lg font-medium transition-all duration-300 hover:underline decoration-2 underline-offset-4 decoration-indigo-500"
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Scroll to Top Button */}
              <button
                onClick={scrollToTop}
                className="group w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
              >
                <FaArrowUp className="text-white text-lg group-hover:scale-110 transition-transform duration-300" />
              </button>
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
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;