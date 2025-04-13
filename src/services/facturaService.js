import api from "../../api";

const facturaService = {
  pagarOrden: async (id_orden) => {
    const response = await api.post(`/facturas/orden/${id_orden}/pagar`);
    return response.data;
  },
};

export default facturaService;
