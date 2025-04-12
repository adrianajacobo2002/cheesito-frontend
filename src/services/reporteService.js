import api from '../../api';

const reporteService = {
  // 🔹 Platillos más vendidos (top 10)
  getPlatillosVendidos: async () => {
    const response = await api.get('/platillos-vendidos');
    return response.data;
  },

  // 🔹 Ingresos por fecha (rango opcional: si no se pasa, muestra todos)
  getIngresosPorFecha: async (desde, hasta) => {
    const response = await api.get('/ingresos', {
      params: desde && hasta ? { desde, hasta } : {},
    });
    return response.data;
  },

  // 🔹 Ingresos por hora (agrupado por horas del día)
  getIngresosPorHora: async () => {
    const response = await api.get('/ingresos-por-hora'); // asegúrate de tener esta ruta en `api.php`
    return response.data;
  },
};

export default reporteService;
