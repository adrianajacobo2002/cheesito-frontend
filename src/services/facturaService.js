import api from "../../api";

const facturaService = {
  pagarOrden: async (id_orden) => {
    const response = await api.post(`/facturas/orden/${id_orden}/pagar`);
    return response.data;
  },

  descargarPDF: async (factura_id) => {
    try {
      const response = await api.get(`/mesero/facturas/pdf/${factura_id}`, {
        responseType: 'blob',
      });
  
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `factura_${factura_id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
  
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
      throw error;
    }
  }
  
};

export default facturaService;
