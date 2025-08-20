# DriveNow - Car Rental Platform

A modern, full-stack car rental application built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication**: Secure login/signup with JWT tokens
- **Google OAuth**: Social login integration
- **Car Listings**: Browse and search available cars
- **Booking System**: Reserve cars with date selection
- **Responsive Design**: Modern UI that works on all devices
- **Admin Dashboard**: Manage cars and bookings
- **Image Upload**: Upload car images with Multer

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer (File Upload)
- bcryptjs (Password Hashing)

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)

## 🚀 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd CarRentalMERN
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/carrental
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_random
```

### 3. Frontend Setup
```bash
cd client
npm install
```

### 4. Start the application

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📁 Project Structure

```
CarRentalMERN/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── assets/
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Cars
- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get car by ID
- `POST /api/cars/add` - Add new car (with image upload)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:userId` - Get user bookings
- `GET /api/bookings/:id` - Get specific booking

## 🎨 UI Improvements Made

- **Modern Design**: Gradient backgrounds, rounded corners, and smooth animations
- **Responsive Layout**: Mobile-first design with breakpoints
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Loading States**: Spinner animations and skeleton screens
- **Enhanced Navigation**: Sticky navbar with user profile display
- **Card Components**: Improved car cards with better information display
- **Filtering & Search**: Advanced search and filter functionality
- **Footer**: Comprehensive footer with contact information and links

## 🐛 Bug Fixes

- Fixed CommonJS/ES6 module compatibility issues
- Corrected import paths for models
- Added missing API routes
- Improved error handling
- Fixed authentication flow
- Enhanced form validation

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Secure file upload handling

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the console for error messages
2. Ensure all environment variables are set correctly
3. Verify MongoDB is running
4. Check that all dependencies are installed

## 🎯 Future Enhancements

- Payment integration (Stripe/PayPal)
- Real-time notifications
- Advanced search filters
- User reviews and ratings
- Admin dashboard improvements
- Email notifications
- Push notifications
- Mobile app development