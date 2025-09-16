import {
  Car,
  User,
  IndianRupee,
  CheckCircle,
  XCircle,
  Trash2,
  Calendar,
} from "lucide-react";
import axios from "axios";

const CarCardAdmin = ({ car }) => {
  const getStatusBadge = (status) => {
    const badges = {
      approved: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    return `px-3 py-1 rounded-full text-xs font-medium border ${
      badges[status] || badges.pending
    }`;
  };
  const approve = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/api/admin/cars/${id}/approve`,
        {},
        tokenHeader()
      );
      await load();
      alert("Car approved and email sent (if configured).");
    } catch (e) {
      alert(e.response?.data?.message || "Approve failed");
    }
  };

  const reject = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/api/admin/cars/${id}/reject`,
        {},
        tokenHeader()
      );
      await load();
    } catch (e) {
      alert(e.response?.data?.message || "Reject failed");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this car?")) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/cars/${id}`,
        tokenHeader()
      );
      await load();
    } catch (e) {
      alert(e.response?.data?.message || "Delete failed");
    }
  };

  return (
  <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {car.brand} {car.model}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {car.owner?.name || car.owner}
              </span>
            </div>
          </div>
        </div>
        <span className={getStatusBadge(car.status)}>{car.status}</span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <IndianRupee className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-gray-900">
            ₹{car.price}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle
            className={`w-4 h-4 ${
              car.available ? "text-green-500" : "text-gray-400"
            }`}
          />
          <span className="text-sm text-gray-600">
            {car.available ? "Available" : "Unavailable"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-600">Active</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {car.status !== "approved" && (
          <button
            onClick={() => approve(car._id)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <CheckCircle className="w-4 h-4" />
            <span className="font-medium">Approve</span>
          </button>
        )}
        {car.status !== "rejected" && (
          <button
            onClick={() => reject(car._id)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <XCircle className="w-4 h-4" />
            <span className="font-medium">Reject</span>
          </button>
        )}
        <button
          onClick={() => remove(car._id)}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>

    {/* Hover effect overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
  </div>
  )
};

export default CarCardAdmin;
