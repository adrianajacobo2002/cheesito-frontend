import api from '../../api';

const mesasService = {
  // Obtener todas las mesas (admin o mesero)
  getAll: async () => {
    const response = await api.get('/mesas');
    return response.data;
  },

  // Obtener detalle de una mesa por ID
  getById: async (id) => {
    const response = await api.get(`/mesas/${id}`);
    return response.data;
  },

  // Crear una nueva mesa (admin)
  create: async (data) => {
    const response = await api.post('/mesas', data);
    return response.data;
  },

  // Actualizar una mesa existente (admin)
  update: async (id, data) => {
    const response = await api.put(`/mesas/${id}`, data);
    return response.data;
  },

  // Eliminar una mesa (admin)
  delete: async (id) => {
    const response = await api.delete(`/mesas/${id}`);
    return response.data;
  },

  // Obtener solo las mesas con órdenes activas (rol mesero)
  getMesasConOrdenes: async () => {
    const response = await api.get('/mesero/mesas');
    return response.data;
  },
};

export default mesasService;
