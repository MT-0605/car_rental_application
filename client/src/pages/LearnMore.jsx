import React from "react";
import { Link } from "react-router-dom";
import { Car, ShieldCheck, CreditCard, Smartphone } from "lucide-react";

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Learn More About Our Car Rental Service</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Rent cars anytime, anywhere with a seamless booking experience, secure payments, and a wide range of vehicles.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <Car className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Wide Range of Cars</h3>
            <p>From economy to luxury cars, choose the perfect ride for your journey.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <ShieldCheck className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
            <p>All vehicles are well-maintained and fully insured for your safety.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <CreditCard className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Payments</h3>
            <p>Pay securely online with multiple payment options available.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <Smartphone className="w-12 h-12 text-pink-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Book Anytime</h3>
            <p>Use our platform 24/7 to book cars quickly and conveniently.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-50 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Hit the Road?</h2>
        <p className="text-lg mb-6">Sign up today and book your first ride with ease.</p>
        <Link
          to="/cars"
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow hover:bg-purple-700 transition"
        >
          Browse Cars
        </Link>
      </section>
    </div>
  );
};

export default LearnMore;
