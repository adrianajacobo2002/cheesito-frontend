import api from '../../api';

const reporteService = {
  // Platillos más vendidos
  getPlatillosVendidos: async () => {
    const response = await api.get('/platillos-vendidos');
    return response.data;
  },

  // Ingresos por fecha
  getIngresosPorFecha: async (desde, hasta) => {
    const response = await api.get('/ingresos', {
      params: { desde, hasta },
    });
    return response.data;
  },

  // Ingresos por hora
  getIngresosPorHora: async () => {
    const response = await api.get('/facturas/por-hora'); // necesitas agregar este endpoint en el backend
    return response.data;
  },
};

export default reporteService;
