import React, { useState } from "react";
import { 
  Send, 
  User, 
  Mail, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Sparkles,
  HeartHandshake
} from "lucide-react";

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    priority: "medium",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Support request submitted:", formData);
      setSubmitStatus('success');
      setFormData({ name: "", email: "", subject: "", priority: "medium", message: "" });
      setIsSubmitting(false);
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      details: "+1 (555) 123-4567",
      subtitle: "Available 24/7",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      details: "support@drivenow.com",
      subtitle: "Response within 2 hours",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: "123 Main Street, City, State",
      subtitle: "Open Mon-Fri 9AM-6PM",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const priorityOptions = [
    { value: "low", label: "Low Priority", color: "bg-gray-100 text-gray-700" },
    { value: "medium", label: "Medium Priority", color: "bg-yellow-100 text-yellow-700" },
    { value: "high", label: "High Priority", color: "bg-orange-100 text-orange-700" },
    { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-700" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-52 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-200"></div>
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-400"></div>
      </div>

      {/* Main Content - Properly spaced from navbar */}
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl mb-8 shadow-xl">
              <HeartHandshake className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-6">
              Contact Support
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're here to help! Reach out to our dedicated support team and we'll get back to you as soon as possible.
            </p>
          </div>

          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 shadow-sm animate-fadeIn">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">Message Sent Successfully!</h3>
                    <p className="text-green-600">Our support team will contact you soon.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                    <p className="text-gray-600">Fill out the details below and we'll get back to you</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-4 bg-white rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-300 outline-none placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-4 bg-white rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-300 outline-none placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Brief description of your inquiry"
                      className="w-full px-4 py-4 bg-white rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-300 outline-none placeholder-gray-400"
                    />
                  </div>

                  {/* Priority Level */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Priority Level
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {priorityOptions.map((option) => (
                        <label key={option.value} className="relative cursor-pointer">
                          <input
                            type="radio"
                            name="priority"
                            value={option.value}
                            checked={formData.priority === option.value}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className={`p-3 rounded-xl border-2 text-center text-sm font-medium transition-all duration-300 ${
                            formData.priority === option.value 
                              ? 'border-indigo-500 ring-2 ring-indigo-100' 
                              : 'border-gray-200 hover:border-gray-300'
                          } ${option.color}`}>
                            {option.label}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Describe your issue or question in detail..."
                      className="w-full px-4 py-4 bg-white rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-300 outline-none placeholder-gray-400 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                    className={`group w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 ${
                      isSubmitting || !formData.name || !formData.email || !formData.message ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Information Sidebar */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105"
                    style={{
                      animationDelay: `${index * 200}ms`,
                      animation: 'fadeInUp 0.8s ease-out forwards'
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <div className="text-white">
                          {info.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{info.title}</h3>
                        <p className="text-gray-800 font-medium">{info.details}</p>
                        <p className="text-sm text-gray-600 mt-1">{info.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Response Time Info */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6" />
                  <h3 className="font-bold text-lg">Response Times</h3>
                </div>
                <div className="space-y-3 text-indigo-100">
                  <div className="flex justify-between">
                    <span>Email Support:</span>
                    <span className="font-semibold">2-4 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Live Chat:</span>
                    <span className="font-semibold">Instant</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone Support:</span>
                    <span className="font-semibold">Immediate</span>
                  </div>
                </div>
              </div>

              {/* Additional Help */}
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="text-center">
                  <Sparkles className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Need Immediate Help?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Check our FAQ section for quick answers to common questions.
                  </p>
                  <button className="w-full bg-indigo-100 text-indigo-700 py-3 rounded-xl font-semibold hover:bg-indigo-200 transition-all duration-300">
                    Browse FAQ
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <Sparkles className="w-12 h-12 mx-auto mb-6 animate-pulse" />
                <h3 className="text-3xl font-bold mb-4">Emergency Support Available</h3>
                <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                  For urgent matters requiring immediate assistance, our 24/7 emergency line is always available
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Call Emergency Line
                  </button>
                  <button className="bg-indigo-500/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-500/40 transition-all duration-300 border border-white/20">
                    Live Chat Now
                  </button>
                </div>
              </div>
            </div>
          </div>
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
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ContactSupport;