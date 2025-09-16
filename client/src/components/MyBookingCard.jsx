import React from "react";

const MyBookingCard = ({ booking }) => {
  // Add a conditional check to ensure the booking prop exists before rendering
  if (!booking) {
    console.error("BookingCard received an undefined booking prop.");
    return null;
  }

  // Format dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateRange = (startDate, endDate) => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    return `${start} - ${end}`;
  };

  // Get car details
  const car = booking.carId || {};
  const carName = car.brand && car.model ? `${car.brand} ${car.model}` : 'Car Details Unavailable';
  const carDetails = car.year && car.category ? `${car.year} · ${car.category} · ${car.location || 'N/A'}` : 'Details unavailable';
  const carImage = car.imageUrl ? `http://localhost:5000${car.imageUrl}` : 'https://placehold.co/200x120/E2E8F0/000000?text=Car+Image';

  // Calculate rental period
  const rentalPeriod = booking.bookingDate && booking.returnDate 
    ? formatDateRange(booking.bookingDate, booking.returnDate)
    : 'Date range unavailable';

  // Get booking status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const status = booking.status || 'pending';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      {/* Car Image Section */}
      <div className="flex-shrink-0 w-full md:w-auto">
        <img
          src={carImage}
          alt={carName}
          className="rounded-lg object-cover w-full h-auto md:w-48 md:h-28 shadow-md"
          onError={(e) => {
            e.target.src = 'https://placehold.co/200x120/E2E8F0/000000?text=Car+Image';
          }}
        />
        <div className="mt-3 text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-900">{carName}</h3>
          <p className="text-sm text-gray-500">{carDetails}</p>
        </div>
      </div>
      
      {/* Booking Details Section */}
      <div className="flex-grow w-full md:w-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Booking and Status */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-gray-700 font-medium">Booking #{booking._id?.slice(-8) || 'N/A'}</span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getStatusColor(status)}`}>
                {status}
              </span>
            </div>
            <div className="text-gray-500 text-sm mb-1">
              <span className="font-medium">Rental Period</span>
            </div>
            <div className="text-gray-700 text-sm">
              {rentalPeriod}
            </div>
          </div>

          {/* Pickup and Return Locations */}
          <div>
            <div className="text-gray-500 text-sm mb-1">
              <span className="font-medium">Pickup Point</span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-700 font-medium">{booking.pickupLocation || 'Not specified'}</span>
            </div>
            <div className="text-gray-500 text-sm mb-1">
              <span className="font-medium">Return Point</span>
            </div>
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-700 font-medium">{booking.returnLocation || 'Not specified'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Price Section */}
      <div className="flex-shrink-0 text-right w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6 mt-4 md:mt-0">
        <div className="text-2xl font-bold text-purple-600">₹{booking.price || 0}</div>
        <div className="text-sm text-gray-500">
          Booked on {booking.createdAt ? formatDate(booking.createdAt) : 'Date unavailable'}
        </div>
        {booking.paymentDueDate && (
          <div className="text-xs text-gray-400 mt-1">
            Payment due: {formatDate(booking.paymentDueDate)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingCard;