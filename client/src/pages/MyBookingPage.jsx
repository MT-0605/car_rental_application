import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Clock, MapPin, Search } from "lucide-react";
import { getLoggedInUser } from "../utils/auth";

const bookingsAPI = {
  getUserBookings: async (userId) => {
    return axios.get(`http://localhost:5000/api/bookings/${userId}`);
  },
};

// ✅ Single Booking Card
const MyBookingCard = ({ booking }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">
            {booking.carId?.brand} {booking.carId?.model}
          </h3>
          <p className="text-sm text-gray-500">Booking #{booking._id.slice(-6)}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            booking.paymentStatus === "Paid"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {booking.paymentStatus}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          Pickup: {booking.pickupLocation}
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          Return: {booking.returnLocation}
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(booking.startDate).toLocaleDateString()}
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          {new Date(booking.endDate).toLocaleDateString()}
        </div>
      </div>

      <div className="mt-3 font-semibold text-indigo-600">
        ₹{booking.totalAmount}
      </div>
    </div>
  );
};

// ✅ Main Page
const MyBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  // ✅ Search filter
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(
        bookings.filter(
          (b) =>
            b.carId?.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.carId?.model?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, bookings]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by car..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-xl w-64 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Loading */}
      {loading ? (
        <p className="text-gray-500">Loading your bookings...</p>
      ) : filteredBookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBookings.map((booking) => (
            <MyBookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingPage;