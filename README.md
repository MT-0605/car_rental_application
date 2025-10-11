# 🚗 DriveNow - Car Rental Platform

A modern, full-stack car rental application built with the MERN stack (MongoDB, Express, React, Node.js) that provides a seamless experience for renting and managing vehicles.

## ✨ Key Features

- **User Authentication** - Secure login/signup with JWT tokens and session management
- **Car Browsing & Filtering** - Browse cars with advanced filtering options
- **Booking System** - Reserve cars with date selection and location preferences
- **Payment Integration** - Secure payment processing for bookings
- **Admin Dashboard** - Comprehensive tools for managing cars, users, and bookings
- **Responsive Design** - Modern UI that works flawlessly across all devices
- **Car Location Tracking** - Automatic updates of car locations upon return
- **Image Management** - Upload and manage car images with preview

<!-- ## 🖥️ Screenshots

<div align="center">
  <p><i>Add your application screenshots here</i></p>
</div> -->

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with hooks for UI building
- **Vite** - Next generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Declarative routing for React
- **Axios** - Promise-based HTTP client
- **React Icons** - Popular icon sets as React components

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - Elegant MongoDB object modeling
- **JWT** - Secure authentication
- **Multer** - File upload middleware
- **bcryptjs** - Password hashing
- **Express Session** - Session management

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/MT-0605/car_rental_application.git
cd DriveNow
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create a .env file with the following variables:
# PORT=5000
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# CLIENT_URL=http://localhost:5173

# Start the server
npm start
```

### 3. Frontend Setup
```bash
cd ../client
npm install
npm start
```

## 🌟 Features In Detail

### For Users
- **Account Management**: Create and manage your user profile
- **Car Search**: Find cars by location, date, price, and features
- **Booking Management**: View your bookings
- **Secure Payments**: Pay securely for your bookings

### For Admins
- **User Management**: View all users details
- **Car Approval**: Approve or reject car listings
- **Booking Oversight**: Monitor all bookings in the system
- **System Analytics**: View platform performance metrics

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login a user

### Cars
- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get a specific car
- `POST /api/cars/add` - Add a new car
- `DELETE /api/cars/:id` - Delete a car
- `POST /api/cars/:id/approve - Approve the car listing
- `POST /api/cars/:id/reject - Reject the car listing


### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create a booking
- `GET /api/bookings/:id` - Get a specific booking

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/bookings` - Get all bookings
- `GET /api/admin/cars` - Get all cars for approval
- `PUT /api/admin/cars/:id` - Approve/reject a car

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Meet Tank - meettank652006@gmail.com

Project Link: [https://github.com/MT-0605/car_rental_application](https://github.com/MT-0605/car_rental_application)

---

<div align="center">
  <p>Made with ❤️ by Meet</p>
</div>