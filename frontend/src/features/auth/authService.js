import api from '../../services/api.js';

const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  if (response.data.token) {
    localStorage.setItem('adminToken', response.data.token);
    localStorage.setItem('adminUser', JSON.stringify(response.data.user));
  }
  return response.data;
};

const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('adminToken', response.data.token);
    localStorage.setItem('adminUser', JSON.stringify(response.data.user));
  }
  return response.data;
};

const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch {
    // proceed regardless
  } finally {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  }
};

const getProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

const updateProfile = async (profileData) => {
  const response = await api.put('/auth/profile', profileData);
  if (response.data.user) {
    localStorage.setItem('adminUser', JSON.stringify(response.data.user));
  }
  return response.data;
};

const authService = { register, login, logout, getProfile, updateProfile };
export default authService;
