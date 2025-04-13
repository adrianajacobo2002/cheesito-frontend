import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, Divider } from "@mui/material";
import Swal from "sweetalert2";

import CardListo from "../../components/Cards/CardListo";
import EliminarPlatilloModal from "../../components/Modals/EliminarPlatilloModal";


import ordenesService from "../../services/ordenesService";
import facturaService from "../../services/facturaService";

const OrdenDetalle = () => {
  const { id } = useParams();
  const [orden, setOrden] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [detalleAEliminar, setDetalleAEliminar] = useState(null);

  const handleOpenModal = (detalle) => {
    setDetalleAEliminar(detalle);
    setModalOpen(true);
  };

  const handleEliminar = async (detalle, cantidadEliminar) => {
    try {
      if (cantidadEliminar <= 0 || cantidadEliminar > detalle.cantidad) {
        Swal.fire("Cantidad inválida", "Ingresa una cantidad válida", "warning");
        return;
      }
  
      await ordenesService.eliminarDetalle(detalle.id_detalle, cantidadEliminar);
  
      Swal.fire(
        "Éxito",
        cantidadEliminar < detalle.cantidad
          ? "Cantidad modificada correctamente"
          : "Platillo eliminado correctamente",
        "success"
      );
  
      const data = await ordenesService.getDetalleOrden(id);
      setOrden(data);
      setModalOpen(false);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo procesar la eliminación", "error");
    }
  };

  const handlePagarOrden = async () => {
    try {
      const result = await Swal.fire({
        title: "¿Deseas pagar esta orden?",
        text: "Una vez pagada no se podrá modificar.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, pagar",
        cancelButtonText: "Cancelar",
      });
  
      if (result.isConfirmed) {
        await facturaService.pagarOrden(id);
        Swal.fire("¡Pagado!", "La orden ha sido cancelada exitosamente.", "success");
        const data = await ordenesService.getDetalleOrden(id);
        setOrden(data);
      }
    } catch (error) {
      if (error?.response?.data?.pendientes?.length) {
        Swal.fire(
          "Platillos pendientes",
          "No se puede pagar una orden con platillos que aún no están listos.",
          "error"
        );
      } else {
        Swal.fire("Error", "No se pudo procesar el pago", "error");
      }
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await ordenesService.getDetalleOrden(id);
      setOrden(data);
    };
    fetchData();
  }, [id]);

  if (!orden) return <Typography>Cargando...</Typography>;

  return (
    <Box sx={{ padding: 4 }}>
      {/* Encabezado */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ color: "#fe7f2d", fontWeight: "bold" }}
          >
            Orden #{orden.id_orden.toString().padStart(4, "0")}
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>{orden.cliente}</Typography>
        </Box>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#fe7f2d", borderRadius: "20px", px: 3 }}
          onClick={handlePagarOrden}
        >
          Pagar
        </Button>
      </Box>

      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "20px",
          padding: 3,
          boxShadow: 3,
        }}
      >
        <Typography sx={{ fontWeight: "bold", mb: 2 }}>
          Detalle de la orden
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 2,
            mb: 2,
          }}
        >
          {orden.detalles.map((p, i) => (
            <CardListo
              key={i}
              pizzaName={p.nombre}
              pizzaImage={p.imagen_url}
              price={parseFloat(p.precio)}
              quantity={p.cantidad}
              estado={p.estado}
              idDetalle={p.id_detalle}
              onButtonClick={() => {}}
              onDeleteClick={(detalle) => handleOpenModal(detalle)}
            />
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />
        <Typography sx={{ fontWeight: "bold", mb: 1 }}>
          Detalle de pago
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography color="text.secondary">Subtotal:</Typography>
          <Typography sx={{ color: "#fe7f2d" }}>
            ${orden.pago.subtotal}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography color="text.secondary">Propina (10%):</Typography>
          <Typography sx={{ color: "#fe7f2d" }}>
            ${orden.pago.propina}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Typography fontWeight="bold">Total:</Typography>
          <Typography fontWeight="bold">${orden.pago.total}</Typography>
        </Box>
      </Box>

      <EliminarPlatilloModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        platillo={detalleAEliminar}
        onConfirm={handleEliminar}
      />
    </Box>
  );
};

export default OrdenDetalle;
