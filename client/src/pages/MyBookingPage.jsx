import React, { useState, useEffect } from 'react';
import { Calendar, Car, Clock, Search, Filter, ChevronDown, BookOpen, Sparkles, ArrowRight } from 'lucide-react';

// Mock components - replace with your actual components
const MyBookingCard = ({ booking }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:border-indigo-200 group">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Car className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{booking.carName || 'Toyota Camry'}</h3>
          <p className="text-sm text-gray-500">Booking #{booking._id?.slice(-6) || 'ABC123'}</p>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
        'bg-gray-100 text-gray-700'
      }`}>
        {booking.status || 'Confirmed'}
      </span>
    </div>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="flex items-center text-gray-600">
        <Calendar className="w-4 h-4 mr-2" />
        {booking.date || 'Dec 15, 2024'}
      </div>
      <div className="flex items-center text-gray-600">
        <Clock className="w-4 h-4 mr-2" />
        {booking.time || '10:00 AM'}
      </div>
    </div>
  </div>
);

const getLoggedInUser = () => ({ id: '123', name: 'John Doe' });
const bookingsAPI = {
  getUserBookings: async (userId) => ({
    data: {
      bookings: [
        { _id: '1', carName: 'Tesla Model 3', status: 'confirmed', date: 'Dec 15, 2024', time: '10:00 AM' },
        { _id: '2', carName: 'BMW X5', status: 'pending', date: 'Dec 18, 2024', time: '2:00 PM' },
        { _id: '3', carName: 'Mercedes C-Class', status: 'confirmed', date: 'Dec 20, 2024', time: '11:30 AM' },
        { _id: '4', carName: 'Audi A4', status: 'cancelled', date: 'Dec 22, 2024', time: '3:00 PM' }
      ]
    }
  })
};

const MyBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");
        const user = getLoggedInUser();
        
        if (!user) {
          setError("Please login to view your bookings.");
          setLoading(false);
          return;
        }

        const res = await bookingsAPI.getUserBookings(user.id);
        setBookings(res.data.bookings || []);
        setFilteredBookings(res.data.bookings || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    let filtered = bookings;

    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.carName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking._id?.includes(searchTerm)
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(booking => booking.status === filterStatus);
    }

    setFilteredBookings(filtered);
  }, [searchTerm, filterStatus, bookings]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 flex items-center justify-center relative overflow-hidden pt-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-52 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-200"></div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-400"></div>
        </div>
        
        <div className="text-center z-10">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-indigo-500 animate-pulse" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading your bookings</h3>
          <p className="text-gray-600">Just a moment while we fetch your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-52 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-200"></div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-400"></div>
      </div>

      {/* Main Content - Properly spaced from navbar */}
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-4">
              My Bookings
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Track and manage all your car reservations in one beautiful place
            </p>
          </div>

          {error && (
            <div className="mb-8 mx-auto max-w-md">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-lg">⚠️</span>
                  </div>
                </div>
                <p className="text-red-700 text-center font-medium">{error}</p>
              </div>
            </div>
          )}

          {bookings.length === 0 && !error ? (
            <div className="text-center py-20">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 max-w-lg mx-auto shadow-xl border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Car className="w-10 h-10 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No bookings yet</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Start your journey by exploring our premium car collection
                </p>
                <button className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center mx-auto">
                  Browse Cars
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Search and Filter Section */}
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 mb-8 shadow-lg border border-white/20">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search bookings by car name or booking ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 outline-none"
                    />
                  </div>
                  
                  <div className="relative">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center space-x-2 px-6 py-3 bg-white rounded-xl border border-gray-200 hover:border-indigo-500 transition-all duration-200"
                    >
                      <Filter className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700 font-medium">Filter</span>
                      <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showFilters && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 p-2 z-20">
                        <div className="space-y-1">
                          {['all', 'confirmed', 'pending', 'cancelled'].map((status) => (
                            <button
                              key={status}
                              onClick={() => setFilterStatus(status)}
                              className={`w-full text-left px-3 py-2 rounded-lg transition-colors capitalize ${
                                filterStatus === status 
                                  ? 'bg-indigo-50 text-indigo-700 font-medium' 
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {status === 'all' ? 'All Bookings' : status}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Results Summary */}
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{filteredBookings.length}</span> of <span className="font-semibold text-gray-900">{bookings.length}</span> bookings
                </p>
              </div>

              {/* Bookings Grid */}
              {filteredBookings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 max-w-md mx-auto shadow-lg border border-white/20">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredBookings.map((booking, index) => (
                    <div
                      key={booking._id}
                      className="transform hover:scale-105 transition-all duration-300"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'fadeInUp 0.6s ease-out forwards'
                      }}
                    >
                      <MyBookingCard booking={booking} />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default MyBookingPage;