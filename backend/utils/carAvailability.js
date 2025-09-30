const Car = require('../models/Car');
const Booking = require('../models/Booking');

// Function to update car availability based on booking return dates
const updateCarAvailability = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Find all bookings where the end date has passed
    const completedBookings = await Booking.find({
      endDate: { $lt: today },
      paymentStatus: "Paid"
    });
    
    console.log(`Found ${completedBookings.length} completed bookings to process`);
    
    // Update each car's availability
    for (const booking of completedBookings) {
      // Check if there are any active bookings for this car
      const activeBookings = await Booking.find({
        carId: booking.carId,
        endDate: { $gte: today },
        paymentStatus: "Paid"
      });
      
      // If no active bookings exist, make the car available again and update its location
      if (activeBookings.length === 0) {
        await Car.findByIdAndUpdate(booking.carId, { 
          available: true,
          location: booking.returnLocation
        });
        console.log(`Car ${booking.carId} is now available again at location: ${booking.returnLocation}`);
      }
    }
    
    console.log('Car availability update completed');
  } catch (error) {
    console.error('Error updating car availability:', error);
  }
};

module.exports = { updateCarAvailability };