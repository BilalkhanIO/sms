// Example content for api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ideal-broccoli-pp6w74jppw7f5rg-5000.app.github.dev',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

