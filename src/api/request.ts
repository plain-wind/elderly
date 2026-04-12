import axios, { type AxiosError, type AxiosResponse } from 'axios';

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_API || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.response.use(
  ({ data }: AxiosResponse) => {
    return data.data;
  },
  (error: AxiosError<{ message?: string; error?: string }>) => {
    const fallback = '请求失败，请稍后重试';

    if (error.response) {
      const payload = error.response.data;
      const message = payload?.message || payload?.error || fallback;
      return Promise.reject(new Error(message));
    }

    if (error.request) {
      return Promise.reject(new Error('无法连接后端服务，请确认接口服务已启动'));
    }

    return Promise.reject(new Error(error.message || fallback));
  }
);

export default request;
