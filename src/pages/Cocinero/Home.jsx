import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography, Grid } from "@mui/material";
import ordenesService from "../../services/ordenesService";
import OrdenesComponent from "../../components/Cards/CardOrder";

const CocineroHome = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [ordenesFiltradas, setOrdenesFiltradas] = useState([]);
  const [ordenesCompletadas, setOrdenesCompletadas] = useState([]);
  const [fechaActual, setFechaActual] = useState("");

  const obtenerFechaActual = () => {
    const hoy = new Date();
    const fechaFormateada = hoy.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setFechaActual(fechaFormateada);
  };

  const fetchOrdenes = async () => {
    try {
      const allOrdenes = await ordenesService.getOrdenesCocinero();
      setOrdenes(allOrdenes);
    } catch (error) {
      console.error("Error al obtener las órdenes del cocinero:", error);
    }
  };

  const marcarComoCompletada = (idOrden) => {
    setOrdenesCompletadas((prev) => [...prev, idOrden]);
  };

  const filtrarPorEstado = useCallback(
    (estado) => {
      const filtradas = ordenes.filter((orden) =>
        orden.estado.toLowerCase() === estado.toLowerCase() &&
        !ordenesCompletadas.includes(orden.id_orden)
      );
      setOrdenesFiltradas(filtradas);
    },
    [ordenes, ordenesCompletadas]
  );

  useEffect(() => {
    obtenerFechaActual();
    fetchOrdenes();
  }, []);

  useEffect(() => {
    filtrarPorEstado("por pagar");
  }, [filtrarPorEstado]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={12}>
          <Typography
            variant="h2"
            sx={{
              color: "#fe7f2d",
              fontWeight: "bold",
              fontFamily: "QuickSand, sans-serif",
            }}
          >
            Bienvenido Chef
          </Typography>
          <Typography sx={{ color: "#666", fontFamily: "Poppins, sans-serif" }}>
            {fechaActual}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: "#fe7f2d",
              fontWeight: "bold",
              fontFamily: "QuickSand, sans-serif",
              mt: 1,
            }}
          >
            Órdenes del día
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {ordenesFiltradas.length > 0 ? (
          ordenesFiltradas.map((orden) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={orden.id_orden}>
              <OrdenesComponent
                ordenes={[orden]}
                fetchOrdenes={fetchOrdenes}
                marcarComoCompletada={marcarComoCompletada}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{
                color: "#333",
                textAlign: "center",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              No hay órdenes disponibles en este estado.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CocineroHome;
