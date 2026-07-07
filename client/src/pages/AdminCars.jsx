import React, { useEffect, useState, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import { adminAPI } from '../utils/api';

const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);

  // State for search, filter, and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending', 'approved', 'rejected'
  const [appliedSearch, setAppliedSearch] = useState('');
  const [appliedStatus, setAppliedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const CARS_PER_PAGE = 10;

  const load = useCallback(async (page = 1, search = '', status = 'all') => {
    setLoading(true);
    try {
      const params = { page, limit: CARS_PER_PAGE, search, status };
      const { data } = await adminAPI.getCars(params);

      setCars(data.cars);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load cars');
    } finally {
      setLoading(false);
    }
  }, [CARS_PER_PAGE]); // Dependency on CARS_PER_PAGE

  // Effect for the initial data load when the component mounts.
  useEffect(() => {
    load();
  }, [load]);

  // Handler for initiating a search or filter change.
  const handleFilterOrSearch = (search = searchTerm, status = statusFilter) => {
    setAppliedSearch(search);
    setAppliedStatus(status);
    load(1, search, status);
  };

  const approve = async (id) => {
    try {
      await adminAPI.approveCar(id);
      await load(currentPage, appliedSearch, appliedStatus);
      alert('Car approved.');
    } catch (e) {
      alert(e.response?.data?.message || 'Approve failed');
    }
  };

  const reject = async (id) => {
    try {
      await adminAPI.rejectCar(id);
      await load(currentPage, appliedSearch, appliedStatus);
      alert('Car rejected.');
    } catch (e) {
      alert(e.response?.data?.message || 'Reject failed');
    }
  };

  const remove = async (id) => {
    if (!confirm('Are you sure you want to delete this car?')) return;
    try {
      await adminAPI.deleteCar(id);
      await load(currentPage, appliedSearch, appliedStatus);
      alert('Car deleted.');
    } catch (e) {
      alert(e.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Manage Cars</h1>

        {/* Search & Filter Controls */}
        <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <input
            type="text"
            placeholder="Search by brand or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleFilterOrSearch()}
            className="w-full sm:max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              const val = e.target.value;
              setStatusFilter(val);
              handleFilterOrSearch(searchTerm, val);
            }}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button
            onClick={() => handleFilterOrSearch(searchTerm, statusFilter)}
            className="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Filter / Search
          </button>
        </div>

        {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6 text-red-600">{error}</div>}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-50">
                  <tr className="text-gray-600">
                    <th className="px-4 py-3 font-medium">Car</th>
                    <th className="px-4 py-3 font-medium">Owner</th>
                    <th className="px-4 py-3 font-medium">Price</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Available</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.length > 0 ? cars.map(car => (
                    <tr key={car._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedCar(car)}
                          className="text-blue-600 hover:text-blue-800 hover:underline font-semibold cursor-pointer text-left focus:outline-none"
                        >
                          {car.brand} {car.model}
                        </button>
                      </td>
                      <td className="px-4 py-3">{car.owner?.name || car.owner}</td>
                      <td className="px-4 py-3">₹{car.price}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          car.status === 'approved' ? 'bg-green-100 text-green-800' :
                          car.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {car.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{car.available ? 'Yes' : 'No'}</td>
                      <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                        {car.status !== 'approved' && (
                          <button onClick={() => approve(car._id)} className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600">Approve</button>
                        )}
                        {car.status !== 'rejected' && (
                          <button onClick={() => reject(car._id)} className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600">Reject</button>
                        )}
                        <button onClick={() => remove(car._id)} className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600">Delete</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-gray-500">No cars found matching your criteria.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => load(currentPage - 1, appliedSearch, appliedStatus)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => load(currentPage + 1, appliedSearch, appliedStatus)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
        {/* Car Details Modal */}
        {selectedCar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
            <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="relative h-48 sm:h-64 bg-slate-900 overflow-hidden flex-shrink-0">
                {selectedCar.imageUrl ? (
                  <img
                    src={selectedCar.imageUrl}
                    alt={`${selectedCar.brand} ${selectedCar.model}`}
                    className="w-full h-full object-cover opacity-80"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center">
                    <svg className="w-20 h-20 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <button
                  onClick={() => setSelectedCar(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-6 left-6 text-white text-left">
                  <span className="px-3 py-1 bg-blue-600 text-xs font-semibold rounded-full uppercase tracking-wider mb-2 inline-block">
                    {selectedCar.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold">
                    {selectedCar.brand} {selectedCar.model}
                  </h2>
                  <p className="text-sm text-gray-200 mt-1">Year {selectedCar.year} • {selectedCar.transmission}</p>
                </div>
              </div>

              {/* Scrollable details */}
              <div className="p-6 overflow-y-auto space-y-6 text-left">
                {/* Highlights grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
                    <span className="block text-xs text-gray-400 uppercase font-medium">Price</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900">₹{selectedCar.price}/day</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
                    <span className="block text-xs text-gray-400 uppercase font-medium">Fuel Type</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 capitalize">{selectedCar.fuelType}</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
                    <span className="block text-xs text-gray-400 uppercase font-medium">Seating</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900">{selectedCar.seating} Seats</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
                    <span className="block text-xs text-gray-400 uppercase font-medium">Location</span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900 capitalize truncate block" title={selectedCar.location}>
                      {selectedCar.location}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</h4>
                  <p className="text-gray-600 leading-relaxed text-sm bg-gray-50 rounded-xl p-4 border border-gray-100">
                    {selectedCar.description || "No description provided for this vehicle."}
                  </p>
                </div>

                {/* Owner & Status Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Owner Info</h4>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {(selectedCar.owner?.name || "O")[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{selectedCar.owner?.name || "Unknown"}</div>
                        <div className="text-xs text-gray-500">{selectedCar.owner?.email || "N/A"}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Status & Availability</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                        selectedCar.status === "approved" ? "bg-green-50 text-green-700 border-green-200" :
                        selectedCar.status === "rejected" ? "bg-red-50 text-red-700 border-red-200" :
                        "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }`}>
                        {selectedCar.status.toUpperCase()}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                        selectedCar.available ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-gray-50 text-gray-700 border-gray-200"
                      }`}>
                        {selectedCar.available ? "AVAILABLE" : "UNAVAILABLE"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0">
                <button
                  onClick={() => setSelectedCar(null)}
                  className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 text-gray-700 font-medium text-sm transition-all duration-200 cursor-pointer"
                >
                  Close
                </button>
                {selectedCar.status !== "approved" && (
                  <button
                    onClick={() => {
                      approve(selectedCar._id);
                      setSelectedCar(null);
                    }}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer"
                  >
                    Approve Car
                  </button>
                )}
                {selectedCar.status !== "rejected" && (
                  <button
                    onClick={() => {
                      reject(selectedCar._id);
                      setSelectedCar(null);
                    }}
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer"
                  >
                    Reject Car
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCars;