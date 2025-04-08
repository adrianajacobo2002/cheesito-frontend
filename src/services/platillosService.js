import api from '../../api'; 

const PlatillosService = {

  getAll: async () => {
    const response = await api.get('/platillos');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/platillos/${id}`);
    return response.data;
  },

  create: async (formData) => {
    const response = await api.post('/platillos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  update: async (id, formData) => {
    const response = await api.post(`/platillos/${id}?_method=PUT`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/platillos/${id}`);
    return response.data;
  },

  agregarStock: async (idInventario, cantidad) => {
    const response = await api.put(`/inventario/${idInventario}/agregar`, {
      cantidad: parseInt(cantidad),
    });
    return response.data;
  }  
  
};

export default PlatillosService;
