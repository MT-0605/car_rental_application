import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getLoggedInUser } from "../utils/auth";

const BookingForm = ({ car }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickupLocation: "",
    returnLocation: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  // Price calculation
  const start = formData.startDate ? new Date(formData.startDate) : null;
  const end = formData.endDate ? new Date(formData.endDate) : null;
  const diffInMs = start && end ? end - start : 0;
  const days = diffInMs > 0 ? Math.ceil(diffInMs / (1000 * 60 * 60 * 24)) : 0;
  const totalPrice = Number(days) > 0 ? days * car.price : car.price;

  // Validate form
  const validateForm = () => {
    if (!formData.pickupLocation || !formData.returnLocation) {
      setError("Please fill in pickup and return locations.");
      return false;
    }
    if (!formData.startDate || !formData.endDate) {
      setError("Please select both pickup and return dates.");
      return false;
    }
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      setError("Pickup date cannot be in the past.");
      return false;
    }
    if (endDate <= startDate) {
      setError("Return date must be after pickup date.");
      return false;
    }
    return true;
  };

  // Booking + Razorpay flow
  const handleBookNow = async (e) => {
    e.preventDefault();
    const user = getLoggedInUser();

    if (!user) {
      setError("You must be logged in to book a car.");
      return;
    }
    if (!validateForm()) return;

    setLoading(true);

    try {
      // ✅ Step 1: Create Razorpay order from backend
      const { data } = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount: totalPrice, // backend should handle paise conversion
      });

      if (!data.success) {
        setError("Failed to create order. Try again.");
        return;
      }

      const { order } = data;
      console.log("Razorpay Order Created:", order);
      console.log("Booking Data:", {
        ...formData,
        carId: car._id,
      });

      // ✅ Step 2: Razorpay Checkout Options
      const options = {
        key: "rzp_test_RIWsXV1k8IirI5",
        amount: order.amount,
        currency: order.currency,
        name: "Car Rental Service",
        description: `Booking for ${car.brand} ${car.model}`,
        order_id: order.id,
        image: "https://example.com/your_logo", // Add your logo URL here
        handler: async function (response) {
          try {
            // ✅ Step 3: Verify payment + Save booking
            const verifyRes = await axios.post("http://localhost:5000/api/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingData: {
                ...formData,
                carId: car._id,
                carName: car.model,
                totalAmount: totalPrice,
                userId: user.id,
              },
            });

            if (verifyRes.data.success) {
              alert("Booking confirmed successfully!");
              navigate("/my-bookings");
            } else {
              setError("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            console.error("Payment verification error:", err);
            setError("Error verifying payment.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: "9999999999", // you can replace with user.phone if available
        },
        notes: {
          carId: car._id,
          carName: `${car.brand} ${car.model}`
        },
        theme: { color: "#4F46E5" },
        modal: {
          ondismiss: function() {
            setLoading(false);
            console.log('Checkout form closed');
          }
        }
      };

      // Create a new instance each time
      const rzp = new Razorpay(options);
      
      // Handle payment failures
      rzp.on('payment.failed', function (response){
        setError(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
      
      rzp.open();
    } catch (err) {
      console.error("Booking error:", err);
      setError("Failed to process booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Find the return statement in the BookingForm component and wrap it with a condition
  // Add this at the beginning of the return statement:
  
  if (!car.available) {
    return (
      <div className="bg-gray-100/80 backdrop-blur-sm rounded-xl p-6 text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Car Unavailable</h3>
        <p className="text-gray-600 mb-4">This car is currently rented and will be available again soon.</p>
        <button
          onClick={() => window.history.back()}
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          Browse Other Cars
        </button>
      </div>
    );
  }
  
  // Then continue with the original return statement for available cars
  return (
    <div className="w-full">
      {/* Price Section */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ₹{car.price}
            </span>
            <span className="text-gray-600 font-medium">per day</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">Excellent value with premium features</p>
      </div>

      {/* Booking Form */}
      <form className="space-y-6" onSubmit={handleBookNow}>
        <input
          type="text"
          name="pickupLocation"
          value={formData.pickupLocation}
          onChange={handleChange}
          placeholder="Enter pickup address"
          required
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="returnLocation"
          value={formData.returnLocation}
          onChange={handleChange}
          placeholder="Enter return address"
          required
          className="w-full border rounded-lg p-3"
        />

        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
          required
          className="w-full border rounded-lg p-3"
        />

        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          min={formData.startDate || new Date().toISOString().split("T")[0]}
          required
          className="w-full border rounded-lg p-3"
        />

        {/* Error */}
        {error && <p className="text-red-600 font-medium">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !car.available}
          className={`w-full py-3 rounded-lg text-white font-bold ${
            loading || !car.available
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Processing..." : "Reserve Now"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
