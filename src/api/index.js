import axios from 'axios';

// Create Axios Instance
const apiClient = axios.create({
  baseURL: 'https://192.168.1.255:8081',
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
      console.log(window.location);
      if (window.location.href.startsWith('http://localhost')) {
        window.location = '/scampoleria/auth';
      } else {
        window.location = 'https://emito89.github.io/scampoleria';
      }
    }

    return {
      error: true,
      status: error.status,
      message: error.message,
    };
  }
};

export default apiRequest;

// Error Handling Interceptor
apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    if (error.response && error.response.status === 400) {
      console.error('Bad request:', error);
    }
    if (
      (error.response && error.response.status === 403) ||
      (error.response && error.response.status === 401)
    ) {
      console.log('Unauthorized access, redirecting...');
      if (window.location.href.startsWith('http://localhost')) {
        window.location = '/scampoleria/auth';
      } else {
        window.location = 'https://emito89.github.io/scampoleria';
      }
    }
    if (error.response && error.response.status === 404) {
      console.log('Url not exist');
    }
    if (error.response && error.response.status === 500) {
      console.log('Server error');
    }
    return Promise.reject(error);
  }
);
