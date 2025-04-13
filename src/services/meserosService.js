import api from '../../api';

const meserosService = {
    getAll: async () => {
      const response = await api.get('/meseros');
      return response.data;
    }
  };
  
  export default meserosService;