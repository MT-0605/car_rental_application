import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/admin/bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(data);
      } catch (e) {
        setError(e.response?.data?.message || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-6">All Bookings</h1>
        {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6 text-red-600">{error}</div>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-600">
                  <th className="px-4 py-3">Booking ID</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Car</th>
                  <th className="px-4 py-3">Dates</th>
                  <th className="px-4 py-3">Amount (₹)</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b._id} className="border-t">
                    <td className="px-4 py-3 font-mono text-xs">{b._id}</td>
                    <td className="px-4 py-3">{b.userId?.name || b.userId}</td>
                    <td className="px-4 py-3">{b.carId?.brand} {b.carId?.model}</td>
                    <td className="px-4 py-3">{new Date(b.startDate).toLocaleDateString()} → {new Date(b.endDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{b.totalAmount}</td>
                    <td className="px-4 py-3">{b.paymentStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;