import React, { useState } from "react";
import { Upload, Car, MapPin, Calendar, DollarSign, Users, Fuel, Settings, Sparkles, Check, AlertCircle, Camera } from "lucide-react";

const AddCarPage = () => {
  // Simulated user data (replace with actual auth hook)
  const user = { id: 1, name: "John Doe" };
  
  const [carData, setCarData] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    category: "",
    transmission: "",
    fuelType: "",
    seating: "",
    location: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleImageFile = (file) => {
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const validateForm = () => {
    const requiredFields = ['brand', 'model', 'year', 'price', 'category', 'transmission', 'fuelType', 'seating', 'location'];
    
    for (const field of requiredFields) {
      if (!carData[field]) {
        setError(`Please fill in the ${field} field.`);
        return false;
      }
    }

    if (!image) {
      setError("Please upload a car image.");
      return false;
    }

    if (carData.year < 1900 || carData.year > new Date().getFullYear() + 1) {
      setError("Please enter a valid year.");
      return false;
    }

    if (carData.price <= 0) {
      setError("Please enter a valid price.");
      return false;
    }

    if (carData.seating <= 0 || carData.seating > 20) {
      setError("Please enter a valid seating capacity.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!user) {
      setError("You must be logged in to list a car.");
      setLoading(false);
      return;
    }

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Replace with your actual API call
      const formData = {
        ...carData,
        userId: user.id,
        image: image,
      };

      // Simulate API call - replace with: const res = await carsAPI.addCar(formData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      setSuccessMsg("🎉 Your car has been listed successfully!");
      
      // Reset form
      setCarData({
        brand: "",
        model: "",
        year: "",
        price: "",
        category: "",
        transmission: "",
        fuelType: "",
        seating: "",
        location: "",
        description: "",
      });
      setImage(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error("Error submitting car:", err);
      setError(err.response?.data?.message || "Failed to list car. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-2xl border-2 border-gray-200 bg-white/70 backdrop-blur-sm focus:border-violet-400 focus:ring-4 focus:ring-violet-100 focus:outline-none transition-all duration-300 hover:border-gray-300 placeholder:text-gray-400";
  const labelClass = "flex items-center gap-2 mb-3 font-semibold text-gray-700 text-sm uppercase tracking-wide";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/10 to-rose-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center p-6 min-h-screen">
        <div className="max-w-5xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full mb-6">
              <Car className="w-12 h-12 text-violet-600" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
              List Your Dream Car
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Transform your car into a source of income. Share the joy of driving with others.
            </p>
          </div>

          {/* Main Form Container */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-12">
            {/* Status Messages */}
            {error && (
              <div className="mb-8 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl flex items-center gap-3 animate-slideIn">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-8 p-4 bg-emerald-50/80 backdrop-blur-sm border border-emerald-200 rounded-2xl flex items-center gap-3 animate-slideIn">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <p className="text-emerald-600 font-medium">{successMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <label className={labelClass}>
                  <Camera className="w-4 h-4" />
                  Upload Car Image
                </label>
                <div
                  className={`relative border-3 border-dashed rounded-3xl p-8 transition-all duration-300 ${
                    dragActive 
                      ? 'border-violet-400 bg-violet-50/50' 
                      : 'border-gray-300 hover:border-violet-300 hover:bg-violet-50/30'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="carImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={loading}
                  />
                  
                  {previewUrl ? (
                    <div className="relative group">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-2xl shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                        <p className="text-white font-medium">Click to change image</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-lg font-medium mb-2">Drop your car image here</p>
                      <p className="text-gray-400">or click to browse (Max 5MB)</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Car Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>
                      <Car className="w-4 h-4" />
                      Brand
                    </label>
                    <input 
                      type="text" 
                      name="brand" 
                      value={carData.brand}
                      className={inputClass} 
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="Toyota, BMW, Mercedes..."
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      <Sparkles className="w-4 h-4" />
                      Model
                    </label>
                    <input 
                      type="text" 
                      name="model" 
                      value={carData.model}
                      className={inputClass} 
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="Camry, X5, C-Class..."
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      <Calendar className="w-4 h-4" />
                      Year
                    </label>
                    <input 
                      type="number" 
                      name="year" 
                      value={carData.year}
                      className={inputClass} 
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="2024"
                      min="1900"
                      max={new Date().getFullYear() + 1}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      <DollarSign className="w-4 h-4" />
                      Price per day (₹)
                    </label>
                    <input 
                      type="number" 
                      name="price" 
                      value={carData.price}
                      className={inputClass} 
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="1500"
                      min="1"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>
                      <Car className="w-4 h-4" />
                      Category
                    </label>
                    <select 
                      name="category" 
                      value={carData.category}
                      className={inputClass} 
                      onChange={handleChange}
                      disabled={loading}
                    >
                      <option value="">Choose category</option>
                      <option value="sedan">🚗 Sedan</option>
                      <option value="suv">🚙 SUV</option>
                      <option value="hatchback">🚘 Hatchback</option>
                      <option value="luxury">✨ Luxury</option>
                      <option value="sports">🏎️ Sports</option>
                      <option value="economy">💰 Economy</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      <Settings className="w-4 h-4" />
                      Transmission
                    </label>
                    <select 
                      name="transmission" 
                      value={carData.transmission}
                      className={inputClass} 
                      onChange={handleChange}
                      disabled={loading}
                    >
                      <option value="">Select transmission</option>
                      <option value="manual">⚙️ Manual</option>
                      <option value="automatic">🔄 Automatic</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      <Fuel className="w-4 h-4" />
                      Fuel Type
                    </label>
                    <select 
                      name="fuelType" 
                      value={carData.fuelType}
                      className={inputClass} 
                      onChange={handleChange}
                      disabled={loading}
                    >
                      <option value="">Select fuel type</option>
                      <option value="petrol">⛽ Petrol</option>
                      <option value="diesel">🛢️ Diesel</option>
                      <option value="electric">⚡ Electric</option>
                      <option value="hybrid">🔋 Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      <Users className="w-4 h-4" />
                      Seating Capacity
                    </label>
                    <input 
                      type="number" 
                      name="seating" 
                      value={carData.seating}
                      className={inputClass} 
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="5"
                      min="1"
                      max="20"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className={labelClass}>
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <input 
                  type="text" 
                  name="location" 
                  value={carData.location}
                  className={inputClass} 
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Mumbai, Maharashtra"
                />
              </div>

              {/* Description */}
              <div>
                <label className={labelClass}>
                  <Sparkles className="w-4 h-4" />
                  Description (Optional)
                </label>
                <textarea 
                  name="description" 
                  value={carData.description}
                  className={`${inputClass} h-32 resize-none`} 
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Tell us what makes your car special..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative px-12 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        List Your Car
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AddCarPage;