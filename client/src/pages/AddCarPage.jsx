import React, { useState } from "react";
import { getLoggedInUser } from "../utils/auth";
import { carsAPI } from "../utils/api";

const AddCarPage = () => {
  const user = getLoggedInUser();
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

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when user starts typing
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("Image size should be less than 5MB");
        return;
      }
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(""); // Clear error when new image is selected
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
      const formData = {
        ...carData,
        userId: user.id,
        image: image,
      };

      const res = await carsAPI.addCar(formData);
      console.log("Car added successfully:", res.data);
      setSuccess(true);
      
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
      setSuccessMsg(res.data.message);
    } catch (err) {
      console.error("Error submitting car:", err);
      setError(err.response?.data?.message || "Failed to list car. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm transition duration-200 disabled:opacity-50";
  const labelClass = "block mb-1 font-medium text-gray-700";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-20">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            List Your Car Today
          </h1>
          <p className="text-gray-500 text-lg">
            Fill out the details below to get your car ready for its next adventure.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-center">{successMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Image Upload */}
          <div>
            <label htmlFor="carImage" className={labelClass}>
              Upload a picture of your car *
            </label>
            <input
              type="file"
              id="carImage"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              disabled={loading}
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-6 w-full h-80 object-cover rounded-xl shadow-md border border-gray-200"
              />
            )}
          </div>

          {/* Brand / Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Brand *</label>
              <input 
                type="text" 
                name="brand" 
                value={carData.brand}
                className={inputClass} 
                onChange={handleChange}
                disabled={loading}
                placeholder="e.g., Toyota, Honda"
              />
            </div>
            <div>
              <label className={labelClass}>Model *</label>
              <input 
                type="text" 
                name="model" 
                value={carData.model}
                className={inputClass} 
                onChange={handleChange}
                disabled={loading}
                placeholder="e.g., Camry, Civic"
              />
            </div>
          </div>

          {/* Year / Price / Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>Year *</label>
              <input 
                type="number" 
                name="year" 
                value={carData.year}
                className={inputClass} 
                onChange={handleChange}
                disabled={loading}
                placeholder="e.g., 2020"
                min="1900"
                max={new Date().getFullYear() + 1}
              />
            </div>
            <div>
              <label className={labelClass}>Price per day (₹) *</label>
              <input 
                type="number" 
                name="price" 
                value={carData.price}
                className={inputClass} 
                onChange={handleChange}
                disabled={loading}
                placeholder="e.g., 1500"
                min="1"
              />
            </div>
            <div>
              <label className={labelClass}>Category *</label>
              <select 
                name="category" 
                value={carData.category}
                className={inputClass} 
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Select Category</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="hatchback">Hatchback</option>
                <option value="luxury">Luxury</option>
                <option value="sports">Sports</option>
                <option value="economy">Economy</option>
              </select>
            </div>
          </div>

          {/* Transmission / Fuel / Seating */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>Transmission *</label>
              <select 
                name="transmission" 
                value={carData.transmission}
                className={inputClass} 
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Select Transmission</option>
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Fuel Type *</label>
              <select 
                name="fuelType" 
                value={carData.fuelType}
                className={inputClass} 
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Select Fuel Type</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Seating Capacity *</label>
              <input 
                type="number" 
                name="seating" 
                value={carData.seating}
                className={inputClass} 
                onChange={handleChange}
                disabled={loading}
                placeholder="e.g., 5"
                min="1"
                max="20"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className={labelClass}>Location *</label>
            <input 
              type="text" 
              name="location" 
              value={carData.location}
              className={inputClass} 
              onChange={handleChange}
              disabled={loading}
              placeholder="e.g., Mumbai, Maharashtra"
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea 
              name="description" 
              value={carData.description}
              className={`${inputClass} h-32`} 
              onChange={handleChange}
              disabled={loading}
              placeholder="Describe your car's features, condition, and any special notes..."
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-12 rounded-full shadow-lg transform hover:scale-105 hover:from-purple-600 hover:to-indigo-700 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spinner w-5 h-5 mr-2"></div>
                  Listing Car...
                </div>
              ) : (
                "List Your Car"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarPage;