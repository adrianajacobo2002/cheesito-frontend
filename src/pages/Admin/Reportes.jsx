import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminReportes = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const datosPlatillos = {
    labels: ["Pizza 1", "Pizza 2", "Pizza 3", "Pizza 4", "Pizza 5"],
    datasets: [
      {
        label: "Cantidad Vendida",
        data: [5, 9, 15, 4, 19],
        backgroundColor: "#00e5e5",
      },
    ],
  };

  const datosPorHora = {
    labels: ["11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"],
    datasets: [
      {
        label: "Facturación",
        data: [5, 10, 4, 20, 16],
        borderColor: "#00e5e5",
        backgroundColor: "#00e5e5",
        tension: 0.4,
      },
    ],
  };

  const ingresosPorFecha = {
    labels: ["01/04", "02/04", "03/04", "04/04", "05/04"],
    datasets: [
      {
        label: "Ingresos",
        data: [12, 15, 18, 20, 22],
        borderColor: "#00e5e5",
        backgroundColor: "#00e5e5",
        tension: 0.4,
      },
    ],
  };

  const opciones = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#000" } },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#000",
      },
    },
    scales: {
      x: { ticks: { color: "#000" }, grid: { color: "#ccc" } },
      y: { ticks: { color: "#000" }, grid: { color: "#ccc" } },
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        minHeight: "100vh",
        padding: "30px",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <Typography
        variant="h3"
        sx={{ color: "#ff7d24", fontWeight: "bold", mb: 1 }}
      >
        Reportes
      </Typography>

      <Typography variant="body1" sx={{ mb: 3, color: "#666" }}>
        {new Date().toLocaleDateString("es-ES")}
      </Typography>

      {/* GRÁFICOS SUPERIORES */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography sx={{ fontWeight: "bold", color: "#ff7d24", mb: 2 }}>
              Platillos más vendidos
            </Typography>
            <Box sx={{ height: 250 }}>
              <Bar data={datosPlatillos} options={opciones} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography sx={{ fontWeight: "bold", color: "#ff7d24", mb: 2 }}>
              Tiempo en el que más se factura
            </Typography>
            <Box sx={{ height: 250 }}>
              <Line data={datosPorHora} options={opciones} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* GRÁFICO DE INGRESOS ABAJO, COMPLETO */}
      <Paper sx={{ p: 3 }}>
        <Typography sx={{ fontWeight: "bold", color: "#ff7d24", mb: 2 }}>
          Ingresos
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
          <TextField
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{
              borderRadius: "20px",
              backgroundColor: "#fff",
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
              },
              "& .MuiInputBase-input": {
                padding: "10px 14px",
              },
            }}
          />

          <TextField
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{
              borderRadius: "20px",
              backgroundColor: "#fff",
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
              },
              "& .MuiInputBase-input": {
                padding: "10px 14px",
              },
            }}
          />

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ff7d24",
              whiteSpace: "nowrap",
              borderRadius: "20px", 
              px: 3, 
            }}
          >
            Filtrar
          </Button>
        </Box>

        <Box sx={{ height: 300, width: "100%", overflowX: "auto" }}>
          <Box sx={{ minWidth: "600px", height: "100%" }}>
            <Line data={ingresosPorFecha} options={opciones} />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminReportes;
