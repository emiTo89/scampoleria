import axios from 'axios';

// Create Axios Instance
const apiClient = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors for Request
apiClient.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('scampoUser'));
    const token = user?.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Generic API Call Function
const apiRequest = async (method, url, data = null, headers = {}) => {
  try {
    const response = await apiClient({
      method,
      url,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);

    if (error.status === 403 || error.status === 401) {
      window.location = '/auth';
    }

    return {
      error: true,
      status: error.status,
      message: error.message,
    };
  }
};

export default apiRequest;
