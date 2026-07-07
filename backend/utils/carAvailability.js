const Car = require('../models/Car');
const Booking = require('../models/Booking');

// Function to update car availability based on booking dates and the 2-day-before rule
const updateCarAvailability = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Fetch all cars and all paid bookings in-memory
    const [cars, bookings] = await Promise.all([
      Car.find(),
      Booking.find({ paymentStatus: "Paid" })
    ]);

    // Group bookings by carId
    const bookingsByCar = {};
    for (const booking of bookings) {
      if (!booking.carId) continue;
      const carIdStr = booking.carId.toString();
      if (!bookingsByCar[carIdStr]) {
        bookingsByCar[carIdStr] = [];
      }
      bookingsByCar[carIdStr].push(booking);
    }

    // 2. Process each car
    for (const car of cars) {
      // If status is not approved, it shouldn't be available
      if (car.status !== 'approved') {
        if (car.available) {
          await Car.findByIdAndUpdate(car._id, { available: false });
          console.log(`Car ${car.brand} ${car.model} marked unavailable (not approved status)`);
        }
        continue;
      }

      const carBookings = bookingsByCar[car._id.toString()] || [];

      let shouldBeUnavailable = false;
      let lastCompletedBooking = null;

      for (const booking of carBookings) {
        const startDate = new Date(booking.startDate);
        const endDate = new Date(booking.endDate);

        // Block window starts 2 days before booking
        const blockStartDate = new Date(startDate);
        blockStartDate.setDate(blockStartDate.getDate() - 2);
        blockStartDate.setHours(0, 0, 0, 0);

        const bookingEnd = new Date(endDate);
        bookingEnd.setHours(23, 59, 59, 999);

        // Check if today falls in the block window
        if (today >= blockStartDate && today <= bookingEnd) {
          shouldBeUnavailable = true;
        }

        // Keep track of the most recent completed booking
        if (today > bookingEnd) {
          if (!lastCompletedBooking || new Date(booking.endDate) > new Date(lastCompletedBooking.endDate)) {
            lastCompletedBooking = booking;
          }
        }
      }

      const updates = {};
      const newAvailableState = !shouldBeUnavailable;

      if (car.available !== newAvailableState) {
        updates.available = newAvailableState;
      }

      if (lastCompletedBooking && car.location !== lastCompletedBooking.returnLocation) {
        updates.location = lastCompletedBooking.returnLocation;
      }

      if (Object.keys(updates).length > 0) {
        await Car.findByIdAndUpdate(car._id, updates);
        console.log(`Updated car ${car.brand} ${car.model}:`, updates);
      }
    }
  } catch (error) {
    console.error('Error updating car availability:', error);
  }
};

module.exports = { updateCarAvailability };