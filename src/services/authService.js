import api from '../../api';

const AuthService = {
  login: (email, password) => {
    return api.post('/login', { email, password });
  },
  logout: () => {
    return api.post('/logout');
  },
  me: () => {
    return api.get('/me');
  }
};

export default AuthService;
