import React, { useEffect, useState, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import { adminAPI } from '../utils/api';

const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
                      <td className="px-4 py-3">{car.brand} {car.model}</td>
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
      </div>
    </div>
  );
};

export default AdminCars;