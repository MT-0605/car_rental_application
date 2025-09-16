import React, { useEffect, useState } from "react";
import {
  Users,
  Car,
  Calendar,
  Activity,
  AlertCircle,
  IndianRupee,
} from "lucide-react";
import axios from "axios";

// Import your existing Sidebar component
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";  

const AdminDash = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "http://localhost:5000/api/admin/stats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStats(data);
      } catch (e) {
        setError(e.response?.data?.message || "Failed to load stats");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-6 shadow-lg animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded mb-3 w-16"></div>
              <div className="h-8 bg-gray-200 rounded mb-2 w-24"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        {/* Header Section */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 mt-2 flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Monitor platform performance in real-time
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">System Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700 font-medium">{error}</span>
          </div>
        )}

        {/* Stats Grid */}
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={Users}
              color="blue"
            />
            <StatCard
              title="Cars Available"
              value={stats.totalCars}
              icon={Car}
              color="green"
            />
            <StatCard
              title="Active Bookings"
              value={stats.totalBookings}
              icon={Calendar}
              color="purple"
            />
            <StatCard
              title="Revenue (₹)"
              value={stats.totalRevenue}
              icon={IndianRupee}
              color="orange"
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminDash;
