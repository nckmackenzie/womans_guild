import { AxiosResponse, isAxiosError } from 'axios';
import axios from './axios';
import apiClient from './axios';

export const getCsrfToken = async () => {
  await apiClient.get('/sanctum/csrf-cookie');
};

export const getUser = async () => {
  try {
    const res: AxiosResponse<{ user: { email: string } }> = await axios.get(
      '/api/user'
    );

    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

export const logout = async () => {
  await axios.post('/logout');

  window.location.pathname = '/login';
};
