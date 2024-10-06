import axios from 'axios';

// Get token from localStorage
const authToken = localStorage.getItem('authToken');

// Create Axios instance with token in headers
const apiService = axios.create({
  baseURL: 'http://localhost:5000/api', // Point to your backend API
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}` // Add the token to Authorization header
  },
});

// Example usage for making API calls
export const login = async (email, password) => {
  const { data } = await apiService.post('/auth/login', { email, password });
  return data;
};

export const register = async ( name, email, password ) => {
  const { data } = await apiService.post('/auth/register', { name, email, password  });
  return data;
};

export const fetchTrips = async () => {
  const { data } = await apiService.get('/trips');
  return data;
};

export const uploadTrip = async (formData) => {
  console.log("Upload trip");
  
  const { data } = await apiService.post('/trips/upload', formData);
  console.log(data);
  
  return data;
};
