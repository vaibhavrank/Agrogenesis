import axios from 'axios';
// import { getStoredUser } from '../services/auth';
// require("dotenv").config();
// import { configDotenv } from 'dotenv';
const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
});

// api.interceptors.request.use((config) => {
//   const user = getStoredUser();
//   if (user?.token) {
//     config.headers.Authorization = `${user.token}`;
//   }
//   return config;
// });

// const API_URL = 'http://localhost:5000';  // Adjust the URL based on your backend

// Login function to call the API
export const login = async (email, password) => { 
    try {
        console.log('Logging in with', email, password);
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // Check if the response is okay (200-level status code)
        if (!response.ok) {
            const message = await response.json();
            alert(message.message || "Login Failed");
            throw new Error("Login Failed");
        }

        // Parse the response to JSON
        const data = await response.json();

        // Store the token in localStorage
        localStorage.setItem('token', data.token);

        // Return success and user info if login was successful
        return {
            success: true,
            user: data.user,
            token: data.token,
        };
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};
export const register = async (username,email,password,role) =>{
    // console.log("IFWV");
    try{
        // console.log("COMING",username,password,role,email);
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password ,role}),
          });
          if (!response.ok) {
            throw new Error('Registration failed');
          }
          const token = response.token;
          return await response.json({success:true,token});
        } catch (error) {
          console.error('Error in registerUser:', error);
          throw error;
        }
}
export const getProfile = () => api.get('/auth/profile');
export const updateProfile = (userData) => api.put('/auth/profile', userData);
export const submitSoilData = (soilData) => api.post('/auth/soil-data', soilData);
export const getSoilData = () => {
    api.get('/auth/soil-data');
}
export const analyzeSoilData = (id) => api.get(`/auth/analyze/${id}`);

export default api;

// // src/services/api.js
// const API_BASE_URL = 'http://localhost:5000/api';

// export const getRandomMovies = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/movies/search`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch random movies');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error in getRandomMovies:', error);
//     throw error;
//   }
// };

// // Add these functions to your existing api.js file

// export const loginUser = async (email, password) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/auth/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       if (!response.ok) {
//         throw new Error('Login failed');
//       }
//       return await response.json();
//     } catch (error) {
//       console.error('Error in loginUser:', error);
//       throw error;
//     }
//   };
  
//   export const registerUser = async (username, email, password) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/auth/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, email, password }),
//       });
//       if (!response.ok) {
//         throw new Error('Registration failed');
//       }
//       const token = response.token;
//       return await response.json({success:true,token});
//     } catch (error) {
//       console.error('Error in registerUser:', error);
//       throw error;
//     }
//   };
//   export const searchMovies = async (searchTerm) => {
//     try {
//       const url = new URL(`${API_BASE_URL}/movies/search`);
//       url.searchParams.append('s', searchTerm); // Assuming 's' is the query parameter used by the API
//       console.log(url);
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'x-auth-token': localStorage.getItem('token'),
//         },
//         query: JSON.stringify({searchTerm})
//       });
  
//       if (!response.ok) {
        
//         throw new Error('Failed to search movies');
//       }
  
//       return await response.json();
//     } catch (error) {
//       console.error('Error in searchMovies:', error);
//       throw error;
//     }
//   };
  