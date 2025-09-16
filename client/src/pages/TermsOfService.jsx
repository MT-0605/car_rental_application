import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="text-gray-600 mb-4">
          Welcome to our Car Rental Service. By using our platform, you agree to the following terms and conditions:
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Booking Policy</h2>
        <p className="text-gray-600">
          All bookings must be completed through our official platform. You are responsible for providing accurate details at the time of booking.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. User Responsibility</h2>
        <p className="text-gray-600">
          You must hold a valid driver’s license and be at least 18 years old to rent a vehicle. You agree to return the car in the same condition as provided.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Payments & Refunds</h2>
        <p className="text-gray-600">
          Payments must be made before the booking is confirmed. Refunds (if applicable) will follow our cancellation policy.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Liability</h2>
        <p className="text-gray-600">
          We are not responsible for accidents, traffic violations, or damages caused during the rental period beyond our insurance coverage.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Amendments</h2>
        <p className="text-gray-600">
          We may update these terms at any time. Continued use of the platform means you accept the updated terms.
        </p>

        <p className="mt-8 text-gray-500 text-sm">
          Last updated: August 2025
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
