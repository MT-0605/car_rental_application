const express = require("express");
const session = require("express-session");
const cors = require('cors');
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const path = require('path');
const { updateCarAvailability } = require("./utils/carAvailability");
const Car = require("./models/Car");

const app = express();
app.use(express.json());
dotenv.config();
connectDB();
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: true,
}));

// Run once on server start to sync availability
updateCarAvailability();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/cars", require("./routes/carRoutes"));
app.use("/api", require("./routes/bookingRoutes"));

app.use("/api/admin", require("./routes/adminRoutes"));

app.use("/api/payment", require("./routes/paymentRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
