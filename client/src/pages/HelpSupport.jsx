import React, { useState } from "react";
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  MessageCircle, 
  Mail, 
  Phone, 
  FileText, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Book,
  Shield,
  CreditCard,
  Calendar
} from "lucide-react";

const HelpSupport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      category: "Booking",
      icon: <Calendar className="w-5 h-5" />,
      question: "How do I book a car?",
      answer: "Simply browse available cars, select your desired vehicle, choose dates, and complete the booking process online. Our streamlined booking system guides you through each step with real-time availability and instant confirmation."
    },
    {
      id: 2,
      category: "Requirements",
      icon: <FileText className="w-5 h-5" />,
      question: "What documents are required?",
      answer: "You need a valid driver's license and a government-issued ID at the time of pickup. International customers may need additional documentation such as an International Driving Permit."
    },
    {
      id: 3,
      category: "Cancellation",
      icon: <CheckCircle className="w-5 h-5" />,
      question: "Can I cancel my booking?",
      answer: "Yes, bookings can be canceled before the pickup date. Free cancellation is available up to 24 hours before pickup. Refund policies may apply based on the timing of cancellation."
    },
    {
      id: 4,
      category: "Insurance",
      icon: <Shield className="w-5 h-5" />,
      question: "Is insurance included?",
      answer: "Yes, all cars come with comprehensive basic insurance coverage including collision damage waiver. Additional premium coverage options are available at checkout for extra protection."
    },
    {
      id: 5,
      category: "Payment",
      icon: <CreditCard className="w-5 h-5" />,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and digital payment methods like PayPal and Apple Pay. Payment is processed securely through encrypted channels."
    },
    {
      id: 6,
      category: "Support",
      icon: <Clock className="w-5 h-5" />,
      question: "What are your customer support hours?",
      answer: "Our customer support team is available 24/7 through live chat and email. Phone support is available from 6 AM to 11 PM daily. Emergency roadside assistance is available round-the-clock."
    }
  ];

  const contactOptions = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: "Available 24/7",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Support",
      description: "Send us a detailed message",
      action: "Send Email",
      available: "Response within 2 hours",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Phone Support",
      description: "Speak directly with our team",
      action: "Call Now",
      available: "6 AM - 11 PM daily",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

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
              <HelpCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-6">
              Help & Support
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Find answers to your questions or get in touch with our expert support team. 
              We're here to help make your car rental experience seamless.
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-300 outline-none text-lg placeholder-gray-500"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactOptions.map((option, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <div className="text-white">
                    {option.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <p className="text-sm text-indigo-600 font-medium mb-6">{option.available}</p>
                <button className={`group/btn w-full bg-gradient-to-r ${option.color} hover:shadow-lg text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2`}>
                  <span>{option.action}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-6">
                <Book className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                {filteredFaqs.length === 0 ? "No questions match your search." : `Found ${filteredFaqs.length} result${filteredFaqs.length !== 1 ? 's' : ''}`}
              </p>
            </div>

            {filteredFaqs.length === 0 && searchTerm ? (
              <div className="text-center py-12">
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 max-w-md mx-auto shadow-lg border border-white/20">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-6">Try a different search term or contact our support team</p>
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                    Contact Support
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div
                    key={faq.id}
                    className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-6 text-left hover:bg-white/30 transition-all duration-300 flex items-center justify-between group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-md">
                          {faq.icon}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-indigo-600 block mb-1">{faq.category}</span>
                          <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${
                          openFaq === faq.id ? 'rotate-180' : ''
                        } group-hover:text-indigo-600`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openFaq === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 pb-6">
                        <div className="pl-14">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <Sparkles className="w-12 h-12 mx-auto mb-6 animate-pulse" />
                <h3 className="text-3xl font-bold mb-4">Still need help?</h3>
                <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                  Our dedicated support team is ready to assist you with any questions or concerns
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Contact Support
                  </button>
                  <button className="bg-indigo-500/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-500/40 transition-all duration-300 border border-white/20">
                    Browse Help Center
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

export default HelpSupport;