import { Routes,Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Admin from './pages/AdminDash'
import AdminBookings from './pages/AdminBookings'
import AdminCars from './pages/AdminCars'
import AdminUsers from './pages/AdminUsers'
import ListCar from './pages/AddCarPage'
import Cars from './pages/CarListPage'
import CarDetails from './pages/CarDetailPage'
import LearnMore from './pages/LearnMore'
import Help from './pages/HelpSupport'
import ContactSupport from './pages/ContactSupport'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import MyBookings from './pages/MyBookingPage'
import ProtectedRoute from './utils/ProtectedRoute'

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const isSignupPage = location.pathname === "/signup";
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isLoginPage && !isSignupPage && !isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/list-car' element={<ProtectedRoute><ListCar /></ProtectedRoute>} />
        <Route path='/cars' element={<ProtectedRoute><Cars /></ProtectedRoute>} />
        <Route path='/cars/:id' element={<ProtectedRoute><CarDetails /></ProtectedRoute>} />
        <Route path='/my-bookings' element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
        <Route path='/learn-more' element={<ProtectedRoute><LearnMore /></ProtectedRoute>} />
        <Route path='/help' element={<ProtectedRoute><Help /></ProtectedRoute>} />
        <Route path='/contact' element={<ProtectedRoute><ContactSupport /></ProtectedRoute>} />
        <Route path='/privacy-policy' element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
        <Route path='/terms-of-service' element={<ProtectedRoute><TermsOfService /></ProtectedRoute>} />

        <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path='/admin/bookings' element={<ProtectedRoute><AdminBookings /></ProtectedRoute>} />
        <Route path='/admin/cars' element={<ProtectedRoute><AdminCars /></ProtectedRoute>} />
        <Route path='/admin/users' element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
      </Routes>
      {!isLoginPage && !isSignupPage && !isAdmin && <Footer />}
    </>
  )
}

export default App
