import Axios from 'axios';

const axios = Axios.create({
  // baseURL: 'http://localhost:8000',
  baseURL: `${import.meta.env.VITE_APP_BASE_URL}/api`,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default axios;
