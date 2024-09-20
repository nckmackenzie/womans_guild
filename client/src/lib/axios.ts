import Axios from 'axios';

const axios = Axios.create({
  // baseURL: 'http://localhost:8000',
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',

    // 'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || '',
  },
  withCredentials: true,
  withXSRFToken: true,
});

axios.interceptors.request.use(
  config => {
    const bearerToken = localStorage.getItem('token');

    if (bearerToken) {
      config.headers['Authorization'] = `Bearer ${bearerToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
