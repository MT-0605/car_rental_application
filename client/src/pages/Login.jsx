import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await authAPI.login(formData);

      if (res.data && res.data.token && res.data.user) {
        const { token, user } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        
        alert("Login successful! Welcome back!");
        if(user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Check if already logged in
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) navigate("/home");
  // }, [navigate]);

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-2 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Floating Car Icons */}
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
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="flex flex-col lg:flex-row h-[95vh] max-h-[700px]">
            
            {/* Left Side - Branding */}
            <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-6 lg:p-8 flex flex-col justify-center items-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center">
                <div className="mb-4 transform hover:scale-110 transition-transform duration-300">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <span className="text-2xl">🚗</span>
                  </div>
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <h2 className="text-lg lg:text-xl font-semibold mb-6 text-blue-100">
                  DriveNow
                </h2>
                <p className="text-sm lg:text-base mb-6 text-blue-100">
                  Continue your premium car rental journey
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3 group">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-400 transition-colors">
                      <span className="text-xs">✓</span>
                    </div>
                    <span className="text-blue-100 text-sm">Instant booking confirmation</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-400 transition-colors">
                      <span className="text-xs">✓</span>
                    </div>
                    <span className="text-blue-100 text-sm">Manage your reservations</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-400 transition-colors">
                      <span className="text-xs">✓</span>
                    </div>
                    <span className="text-blue-100 text-sm">Exclusive member benefits</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute bottom-4 right-4 text-4xl text-white/10 transform rotate-12">
                🏎️
              </div>
              <div className="absolute top-4 left-4 text-2xl text-white/10 transform -rotate-12">
                🚙
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:w-1/2 p-4 lg:p-6 bg-white/5 backdrop-blur-sm flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-1">Sign In</h2>
                  <p className="text-gray-300 text-sm">Access your DriveNow account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="group">
                    <label htmlFor="email" className="block text-xs font-medium text-gray-200 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:bg-white/15 text-sm"
                        disabled={loading}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-400">✉️</span>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label htmlFor="password" className="block text-xs font-medium text-gray-200 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:bg-white/15 pr-10 text-sm"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors"
                      >
                        <span className="text-sm">{showPassword ? "🙈" : "👁️"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => alert('Forgot password functionality would be implemented')}
                      className="text-blue-400 hover:text-blue-300 text-xs transition-colors duration-200 hover:underline bg-transparent border-none cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg backdrop-blur-sm">
                      <p className="text-red-200 text-xs text-center">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group text-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Signing In...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Sign In</span>
                        <span>🔐</span>
                      </div>
                    )}
                  </button>

                  <div className="text-center pt-4">
                    <p className="text-gray-300 text-xs">
                      Don't have an account?{" "}
                      <Link 
                        to="/signup" 
                        className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 hover:underline"
                      >
                        Create Account
                      </Link>
                    </p>
                  </div>
                </form>

                {/* Trust Indicators */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex justify-center space-x-4 text-gray-400">
                    <div className="flex items-center space-x-1">
                      <span className="text-green-400">🔒</span>
                      <span className="text-xs">Secure</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-blue-400">⚡</span>
                      <span className="text-xs">Fast</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-purple-400">✨</span>
                      <span className="text-xs">Trusted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
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
      `}</style>
    </div>
  );
};

export default Login;