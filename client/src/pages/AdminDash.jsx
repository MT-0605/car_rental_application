import React, { useEffect, useState } from "react";
import {
  Users,
  Car,
  Calendar,
  Activity,
  AlertCircle,
  IndianRupee,
} from "lucide-react";
import { adminAPI } from "../utils/api";

// Import your existing Sidebar component
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";  

// Line chart helper
const SVGLineChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  const width = 500;
  const height = 200;
  const paddingLeft = 55;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const values = data.map((d) => d.value);
  const maxValue = Math.max(...values, 1000);

  const points = data.map((d, i) => {
    const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (d.value / maxValue) * chartHeight;
    return { x, y, name: d.name, value: d.value };
  });

  let linePath = "";
  let areaPath = "";

  if (points.length > 0) {
    linePath = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map((p) => `L ${p.x} ${p.y}`).join(" ");
    areaPath = `${linePath} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`;
  }

  const yTicks = [];
  for (let i = 0; i <= 3; i++) {
    const value = Math.round((maxValue * i) / 3);
    const y = paddingTop + chartHeight - (value / maxValue) * chartHeight;
    yTicks.push({ value, y });
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 w-full hover:shadow-lg transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend (Last 6 Months)</h3>
      <div className="relative w-full h-[220px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          <defs>
            <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {yTicks.map((tick, idx) => (
            <line
              key={idx}
              x1={paddingLeft}
              y1={tick.y}
              x2={width - paddingRight}
              y2={tick.y}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}

          {/* Y Axis Labels */}
          {yTicks.map((tick, idx) => (
            <text
              key={idx}
              x={paddingLeft - 8}
              y={tick.y + 3}
              textAnchor="end"
              className="text-[10px] fill-gray-400 font-medium"
            >
              ₹{tick.value >= 1000 ? `${(tick.value / 1000).toFixed(0)}k` : tick.value}
            </text>
          ))}

          {/* X Axis Labels */}
          {points.map((p, idx) => (
            <text
              key={idx}
              x={p.x}
              y={height - 10}
              textAnchor="middle"
              className="text-[10px] fill-gray-400 font-medium"
            >
              {p.name}
            </text>
          ))}

          {/* Filled Area */}
          {areaPath && <path d={areaPath} fill="url(#chart-area-grad)" />}

          {/* Line Path */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="#4f46e5"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Dots */}
          {points.map((p, idx) => (
            <g key={idx} className="group cursor-pointer">
              <circle
                cx={p.x}
                cy={p.y}
                r="4"
                fill="#ffffff"
                stroke="#4f46e5"
                strokeWidth="2"
              />
              <circle
                cx={p.x}
                cy={p.y}
                r="8"
                fill="#4f46e5"
                fillOpacity="0"
                className="hover:fill-opacity-10 transition-all duration-150"
              />
              <title>{`${p.name}: ₹${p.value.toLocaleString()}`}</title>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

// Bar chart helper
const SVGBarChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  const width = 500;
  const height = 200;
  const paddingLeft = 70;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const values = data.map((d) => d.value);
  const maxValue = Math.max(...values, 5);

  const barHeight = chartHeight / data.length - 8;

  const bars = data.map((d, i) => {
    const y = paddingTop + i * (chartHeight / data.length) + 4;
    const w = (d.value / maxValue) * chartWidth;
    return { name: d.name, value: d.value, y, w };
  });

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 w-full hover:shadow-lg transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Booked Car Brands</h3>
      <div className="relative w-full h-[220px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          {/* Vertical Grid lines */}
          {[0, 1, 2, 3].map((tickIdx) => {
            const x = paddingLeft + (tickIdx / 3) * chartWidth;
            const tickValue = Math.round((maxValue * tickIdx) / 3);
            return (
              <g key={tickIdx}>
                <line
                  x1={x}
                  y1={paddingTop}
                  x2={x}
                  y2={height - paddingBottom}
                  stroke="#f3f4f6"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={height - 10}
                  textAnchor="middle"
                  className="text-[10px] fill-gray-400 font-medium"
                >
                  {tickValue}
                </text>
              </g>
            );
          })}

          {/* Bar rendering */}
          {bars.map((bar, idx) => (
            <g key={idx}>
              <text
                x={paddingLeft - 10}
                y={bar.y + barHeight / 2 + 4}
                textAnchor="end"
                className="text-[11px] fill-gray-600 font-semibold"
              >
                {bar.name}
              </text>

              <rect
                x={paddingLeft}
                y={bar.y}
                width={chartWidth}
                height={barHeight}
                rx="4"
                fill="#f9fafb"
              />

              <rect
                x={paddingLeft}
                y={bar.y}
                width={bar.w}
                height={barHeight}
                rx="4"
                fill="url(#bar-grad)"
                className="transition-all duration-500 ease-out"
              >
                <title>{`${bar.name}: ${bar.value} bookings`}</title>
              </rect>

              {bar.w > 20 && (
                <text
                  x={paddingLeft + bar.w - 8}
                  y={bar.y + barHeight / 2 + 4}
                  textAnchor="end"
                  className="text-[10px] fill-white font-bold"
                >
                  {bar.value}
                </text>
              )}
            </g>
          ))}

          <defs>
            <linearGradient id="bar-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

const AdminDash = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [statsRes, bookingsRes] = await Promise.all([
          adminAPI.getStats(),
          adminAPI.getBookings(),
        ]);
        setStats(statsRes.data);
        setBookings(bookingsRes.data || []);
      } catch (e) {
        setError(e.response?.data?.message || "Failed to load stats");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const getMonthlyRevenue = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyData = {};

    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const key = `${months[d.getMonth()]} ${d.getFullYear().toString().slice(-2)}`;
      monthlyData[key] = 0;
    }

    bookings.forEach((booking) => {
      if (!booking.startDate) return;
      const date = new Date(booking.startDate);
      const key = `${months[date.getMonth()]} ${date.getFullYear().toString().slice(-2)}`;
      if (monthlyData[key] !== undefined) {
        monthlyData[key] += booking.totalAmount || 0;
      }
    });

    return Object.entries(monthlyData).map(([name, value]) => ({ name, value }));
  };

  const getBrandStats = () => {
    const brandData = {};
    bookings.forEach((booking) => {
      const brand = booking.carId?.brand || "Unknown";
      brandData[brand] = (brandData[brand] || 0) + 1;
    });

    return Object.entries(brandData)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  };

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
          <>
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

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SVGLineChart data={getMonthlyRevenue()} />
              <SVGBarChart data={getBrandStats()} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default AdminDash;
