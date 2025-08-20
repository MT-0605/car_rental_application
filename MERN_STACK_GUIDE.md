# MERN Stack Car Rental Application - Complete Guide

## 🏗️ **MERN Stack Architecture**

### **MongoDB (Database)**
- **Database**: MongoDB with Mongoose ODM
- **Collections**: Users, Cars, Bookings
- **Connection**: MongoDB Atlas or Local MongoDB

### **Express.js (Backend)**
- **Framework**: Express.js with Node.js
- **Authentication**: JWT + Passport.js
- **File Upload**: Multer for image handling
- **Validation**: Built-in validation with error handling

### **React.js (Frontend)**
- **Framework**: React 19 with Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios with interceptors

### **Node.js (Runtime)**
- **Runtime**: Node.js with ES6+ features
- **Package Manager**: npm
- **Environment**: dotenv for configuration

## 📊 **Database Schema**

### **User Collection**
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  role: String (enum: ['admin', 'user']),
  isGoogleUser: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### **Car Collection**
```javascript
{
  _id: ObjectId,
  brand: String (required),
  model: String (required),
  year: Number (required),
  price: Number (required),
  category: String (required),
  transmission: String (required),
  fuelType: String (required),
  seating: Number (required),
  location: String (required),
  description: String,
  imageUrl: String,
  owner: ObjectId (ref: User),
  status: String (enum: ['pending', 'approved', 'rejected']),
  createdAt: Date,
  updatedAt: Date
}
```

### **Booking Collection**
```javascript
{
  _id: ObjectId,
  carId: ObjectId (ref: Car, required),
  userId: ObjectId (ref: User, required),
  bookingDate: Date (required),
  returnDate: Date (required),
  price: Number (required),
  paymentDueDate: Date (required),
  pickupLocation: String (required),
  returnLocation: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 **API Endpoints**

### **Authentication Routes**
```
POST /api/auth/signup     - User registration
POST /api/auth/login      - User login
GET  /api/auth/google     - Google OAuth
GET  /api/auth/google/callback - Google OAuth callback
```

### **Car Routes**
```
GET    /api/cars          - Get all cars
GET    /api/cars/:id      - Get car by ID
POST   /api/cars/add      - Add new car (with image)
```

### **Booking Routes**
```
POST   /api/bookings      - Create booking
GET    /api/bookings/:userId - Get user bookings
GET    /api/bookings/:id  - Get specific booking
```

## 🚀 **Setup Instructions**

### **1. Prerequisites**
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

### **2. Clone and Install**
```bash
git clone <repository-url>
cd CarRentalMERN

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../client
npm install
```

### **3. Environment Setup**
```bash
# Backend environment variables
cd backend
# Create .env file with:
PORT=5000
MONGO_URI=mongodb://localhost:27017/carrental
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_random
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

### **4. Database Setup**
```bash
# Start MongoDB (if local)
mongod

# Seed the database with sample data
cd backend
npm run seed
```

### **5. Start the Application**
```bash
# Start backend (Terminal 1)
cd backend
npm start

# Start frontend (Terminal 2)
cd client
npm run dev
```

### **6. Access the Application**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 👥 **Demo Accounts**

After running the seed script, you can use these accounts:

### **Admin Account**
- Email: admin@drivenow.com
- Password: admin123
- Role: Admin (can manage all cars and bookings)

### **User Accounts**
- Email: john@example.com
- Password: password123
- Email: jane@example.com
- Password: password123

## 📁 **Project Structure**

```
CarRentalMERN/
├── backend/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── passport-setup.js  # Google OAuth setup
│   ├── controllers/
│   │   ├── authController.js  # Auth logic
│   │   └── carController.js   # Car CRUD operations
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT authentication
│   ├── models/
│   │   ├── User.js           # User schema
│   │   ├── Car.js            # Car schema
│   │   └── Booking.js        # Booking schema
│   ├── routes/
│   │   ├── authRoutes.js     # Auth endpoints
│   │   ├── carRoutes.js      # Car endpoints
│   │   └── bookingRoutes.js  # Booking endpoints
│   ├── utils/
│   │   ├── hash.js           # Password hashing
│   │   └── token.js          # JWT utilities
│   ├── uploads/              # Car images storage
│   ├── seed.js               # Database seeding
│   ├── server.js             # Express server
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── utils/           # Utilities (API, auth)
│   │   ├── assets/          # Images and static files
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── public/              # Public assets
│   └── package.json
└── README.md
```

## 🔐 **Security Features**

### **Authentication**
- JWT token-based authentication
- Password hashing with bcrypt
- Google OAuth integration
- Protected routes with middleware

### **Data Validation**
- Input validation on both frontend and backend
- File upload validation (image size, type)
- SQL injection prevention with Mongoose
- XSS protection with proper escaping

### **Error Handling**
- Comprehensive error handling
- User-friendly error messages
- Logging for debugging
- Graceful fallbacks

## 📱 **Features**

### **User Features**
- User registration and login
- Google OAuth authentication
- Browse available cars
- Search and filter cars
- View car details
- Book cars with date selection
- View booking history
- Upload car images

### **Admin Features**
- Manage all cars
- Approve/reject car listings
- View all bookings
- User management

### **Technical Features**
- Responsive design
- Real-time form validation
- Image upload and storage
- Date range selection
- Price calculation
- Booking confirmation
- Email notifications (future)

## 🛠️ **Development**

### **Adding New Features**
1. Create database schema in `models/`
2. Add routes in `routes/`
3. Create controllers in `controllers/`
4. Add frontend components in `client/src/`
5. Update API service in `client/src/utils/api.js`

### **Database Operations**
```javascript
// Example: Adding a new car
const newCar = new Car({
  brand: "Toyota",
  model: "Camry",
  year: 2023,
  price: 3000,
  // ... other fields
});
await newCar.save();
```

### **API Testing**
Use tools like Postman or curl to test endpoints:
```bash
# Test car listing
curl http://localhost:5000/api/cars

# Test authentication
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

## 🚀 **Deployment**

### **Backend Deployment**
1. Set up MongoDB Atlas
2. Deploy to Heroku/Vercel/Railway
3. Set environment variables
4. Configure CORS for frontend domain

### **Frontend Deployment**
1. Build the project: `npm run build`
2. Deploy to Vercel/Netlify
3. Update API base URL
4. Configure environment variables

## 📈 **Performance Optimization**

### **Database**
- Index frequently queried fields
- Use pagination for large datasets
- Implement caching with Redis (future)

### **Frontend**
- Lazy loading for images
- Code splitting with React.lazy()
- Optimize bundle size
- Use CDN for static assets

## 🔧 **Troubleshooting**

### **Common Issues**
1. **MongoDB Connection Error**: Check if MongoDB is running
2. **CORS Error**: Verify CORS configuration in backend
3. **Image Upload Error**: Check uploads directory permissions
4. **Authentication Error**: Verify JWT secret and token format

### **Debug Mode**
```bash
# Backend with debug logging
NODE_ENV=development npm start

# Frontend with detailed errors
npm run dev
```

## 📚 **Additional Resources**

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

This MERN stack application provides a complete car rental platform with MongoDB data storage, secure authentication, and a modern React frontend. All data is properly stored in MongoDB collections with proper relationships and validation.
