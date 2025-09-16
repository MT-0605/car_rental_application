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
        <Route path='/home' element={<Home />} />
        <Route path='/list-car' element={<ListCar />} />
        <Route path='/cars' element={<Cars />} />
        <Route path='/cars/:id' element={<CarDetails />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/learn-more' element={<LearnMore />} />
        <Route path='/help' element={<Help />} />
        <Route path='/contact' element={<ContactSupport />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-of-service' element={<TermsOfService />} />

        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/bookings' element={<AdminBookings />} />
        <Route path='/admin/cars' element={<AdminCars />} />
        <Route path='/admin/users' element={<AdminUsers />} />
      </Routes>
      {!isLoginPage && !isSignupPage && !isAdmin && <Footer />}
    </>
  )
}

export default App
