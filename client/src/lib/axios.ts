import Axios from 'axios';
import Cookies from 'js-cookie';

const axios = Axios.create({
  // baseURL: 'http://localhost:8000',
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || '',
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default axios;
