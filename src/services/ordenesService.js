import api from '../../api';

const ordenesService = {
  // Crear una nueva orden
  crearOrden: async (mesa_id, nombre_cliente, mesero_id) => {
    const response = await api.post('/ordenes', { 
      mesa_id,
      nombre_cliente,
      mesero_id
  });
    return response.data;
  },

  // Agregar platillos a una orden
  agregarPlatillos: async (orden_id, platillos) => {
    const response = await api.post(`/ordenes/${orden_id}/agregar-platillos`, { platillos });
    return response.data;
  },

  // Pagar una orden
  pagarOrden: async (orden_id) => {
    const response = await api.put(`/ordenes/${orden_id}/pagar`);
    return response.data;
  },

  // Obtener todas las órdenes del mesero autenticado
  getOrdenesMesero: async () => {
    const response = await api.get('/ordenes');
    return response.data;
  },

  // Obtener detalle de una orden específica del mesero autenticado
  getDetalleOrden: async (orden_id) => {
    const response = await api.get(`/ordenes/${orden_id}/resumen`);
    return response.data;
  },

  // Obtener historial de órdenes (admin)
  getHistorialOrdenes: async () => {
    const response = await api.get('/ordenes/historial');
    return response.data;
  },

  // Obtener detalle del historial (admin)
  getDetalleHistorial: async (orden_id) => {
    const response = await api.get(`/ordenes/historial/${orden_id}`);
    return response.data;
  },

  getOrdenesCocinero: async () => {
    const response = await api.get('/chef/ordenes');
    return response.data;
  },

  actualizarEstadoDetalle: async (id_detalle_orden, nuevoEstado) => {
    const response = await api.put(`/chef/detalle-orden/${id_detalle_orden}/estado`, {
      estado: nuevoEstado
    });
    return response.data;
  },

  eliminarDetalle: async (id_detalle, cantidad) => {
    const response = await api.post(`/detalle-orden/${id_detalle}`, { cantidad });
    return response.data;
  }
  
  
  
};

export default ordenesService;
