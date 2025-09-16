import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-4">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p className="text-gray-600">
          We may collect personal information such as your name, email, phone number, driver’s license, and payment details when you use our services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Information</h2>
        <p className="text-gray-600">
          Your data is used for booking confirmations, customer support, payment processing, and improving our services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
        <p className="text-gray-600">
          We use industry-standard encryption and security practices to protect your information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Sharing of Information</h2>
        <p className="text-gray-600">
          We do not sell your personal data. Information may only be shared with third parties for payment processing, legal compliance, or service improvement.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
        <p className="text-gray-600">
          You can request to update or delete your personal data at any time by contacting our support team.
        </p>

        <p className="mt-8 text-gray-500 text-sm">
          Last updated: August 2025
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
