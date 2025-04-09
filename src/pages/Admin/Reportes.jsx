import React, { useEffect, useState } from "react";
import {
  Box, Typography, TextField, Button, Grid, Paper
} from "@mui/material";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, PointElement,
  LineElement, Title, Tooltip, Legend
} from "chart.js";
import reporteService from "../../services/reporteService";

ChartJS.register(
  CategoryScale, LinearScale, BarElement, PointElement,
  LineElement, Title, Tooltip, Legend
);

const AdminReportes = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [datosPlatillos, setDatosPlatillos] = useState(null);
  const [datosIngresos, setDatosIngresos] = useState(null);
  const [datosPorHora, setDatosPorHora] = useState(null);

  const obtenerReportes = async () => {
    try {
      const [platillos, horas] = await Promise.all([
        reporteService.getPlatillosVendidos(),
        reporteService.getIngresosPorHora()
      ]);

      setDatosPlatillos({
        labels: platillos.map(p => p.nombre),
        datasets: [
          {
            label: "Cantidad Vendida",
            data: platillos.map(p => p.total_vendidos),
            backgroundColor: "#00e5e5",
          },
        ],
      });

      setDatosPorHora({
        labels: horas.map(h => h.hora),
        datasets: [
          {
            label: "Facturación",
            data: horas.map(h => h.total),
            backgroundColor: "#00e5e5",
            borderColor: "#00e5e5",
            tension: 0.4,
          },
        ],
      });
    } catch (err) {
      console.error("Error al cargar reportes:", err);
    }
  };

  const obtenerIngresosPorFecha = async () => {
    if (!fechaInicio || !fechaFin) return;

    try {
      const ingresos = await reporteService.getIngresosPorFecha(fechaInicio, fechaFin);
      setDatosIngresos({
        labels: ingresos.map(i => i.fecha),
        datasets: [
          {
            label: "Ingresos",
            data: ingresos.map(i => i.total_ingresos),
            backgroundColor: "#00e5e5",
            borderColor: "#00e5e5",
            tension: 0.4,
          },
        ],
      });
    } catch (err) {
      console.error("Error al cargar ingresos por fecha:", err);
    }
  };

  useEffect(() => {
    obtenerReportes();
  }, []);

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
    <Box sx={{ width: "100%", padding: "30px", minHeight: "100vh" }}>
      <Typography variant="h3" sx={{ color: "#ff7d24", fontWeight: "bold", mb: 1 }}>
        Reportes
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: "#666" }}>
        {new Date().toLocaleDateString("es-ES")}
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography sx={{ fontWeight: "bold", color: "#ff7d24", mb: 2 }}>
              Platillos más vendidos
            </Typography>
            <Box sx={{ height: 250 }}>
              {datosPlatillos && <Bar data={datosPlatillos} options={opciones} />}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography sx={{ fontWeight: "bold", color: "#ff7d24", mb: 2 }}>
              Horas de más facturación
            </Typography>
            <Box sx={{ height: 250 }}>
              {datosPorHora && <Line data={datosPorHora} options={opciones} />}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Typography sx={{ fontWeight: "bold", color: "#ff7d24", mb: 2 }}>
          Ingresos por fecha
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
          <TextField
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            size="small"
          />
          <TextField
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            size="small"
          />
          <Button variant="contained" sx={{ backgroundColor: "#ff7d24", px: 3, borderRadius: "20px" }}
            onClick={obtenerIngresosPorFecha}>
            Filtrar
          </Button>
        </Box>
        <Box sx={{ height: 300 }}>
          {datosIngresos && <Line data={datosIngresos} options={opciones} />}
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminReportes;
