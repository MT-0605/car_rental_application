import axios from 'axios';

const API_BASE_URL = "http://localhost:5000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: (userData) => api.post('/auth/signup', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

// Cars API
export const carsAPI = {
  getAllCars: () => api.get('/cars'),
  getCarById: (id) => api.get(`/cars/${id}`),
  addCar: (carData) => {
    const formData = new FormData();
    Object.keys(carData).forEach(key => {
      if (key === 'image' && carData[key]) {
        formData.append('image', carData[key]);
      } else {
        formData.append(key, carData[key]);
      }
    });
    return api.post('/cars/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Bookings API
export const bookingsAPI = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getUserBookings: (userId) => api.get(`/bookings/${userId}`),
  getBookingById: (id) => api.get(`/bookings/${id}`),
};

// Admin API
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getBookings: () => api.get('/admin/bookings'),
  getCars: () => api.get('/admin/cars'),
  approveCar: (id) => api.post(`/admin/cars/${id}/approve`),
  rejectCar: (id) => api.post(`/admin/cars/${id}/reject`),
  deleteCar: (id) => api.delete(`/admin/cars/${id}`),
  getUsers: () => api.get('/admin/users'),
};

export default api;
