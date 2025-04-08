import React from "react";
import { Box, Typography } from "@mui/material";

const MeseroMesaDetalle = () => {
  return (
    <Box sx={{ padding: "20px" }}>
      <Typography
        variant="h2"
        sx={{
          color: "#fe7f2d",
          marginBottom: "10px",
          fontWeight: "bold",
          fontFamily: "QuickSand, sans-serif",
        }}
      >
        Mesero Mesa Detalle
      </Typography>

      <Typography
        sx={{
          fontFamily: "Poppins, sans-serif",
          color: "#666",
          marginBottom: "10px",
        }}
      >
        Aquí se mostrarán los reportes de actividad, estadísticas y más.
      </Typography>

      {/* Aquí irán las gráficas, filtros, exportaciones, etc. */}
    </Box>
  );
};

export default MeseroMesaDetalle;