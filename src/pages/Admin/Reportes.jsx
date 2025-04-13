import React, { useEffect, useState } from "react";
import {
  Box, Typography, TextField, Button, Grid, Paper, CircularProgress
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
  const [fechaActual, setFechaActual] = useState("");
  const [loading, setLoading] = useState(true);

  const obtenerReportes = async () => {
    try {
      const [platillos, horas] = await Promise.all([
        reporteService.getPlatillosVendidos(),
        reporteService.getIngresosPorHora()
      ]);

      setDatosPlatillos({
        labels: platillos.map(p => p.nombre),
        datasets: [{
          label: "Cantidad Vendida",
          data: platillos.map(p => p.total_vendidos),
          backgroundColor: "#51bfcc",
        }],
      });

      setDatosPorHora({
        labels: horas.map(h => h.hora),
        datasets: [{
          label: "Facturación",
          data: horas.map(h => h.total),
          backgroundColor: "#51bfcc",
          borderColor: "#51bfcc",
          tension: 0.4,
        }],
      });

      setLoading(false);
    } catch (err) {
      console.error("Error al cargar reportes:", err);
    }
  };

  const obtenerIngresosPorFecha = async () => {
    try {
      const ingresos = await reporteService.getIngresosPorFecha(fechaInicio, fechaFin);
      if (!ingresos.length) {
        setDatosIngresos(null);
        return;
      }

      setDatosIngresos({
        labels: ingresos.map(i => i.fecha),
        datasets: [{
          label: "Ingresos",
          data: ingresos.map(i => parseFloat(i.total_ingresos)),
          backgroundColor: "#51bfcc",
          borderColor: "#51bfcc",
          tension: 0.4,
        }],
      });
    } catch (err) {
      console.error("Error al cargar ingresos por fecha:", err);
    }
  };

  const obtenerFechaActual = () => {
    const hoy = new Date();
    const fechaFormateada = hoy.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setFechaActual(fechaFormateada);
  };

  useEffect(() => {
    obtenerFechaActual();
    obtenerReportes();
    obtenerIngresosPorFecha();
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
      x: {
        ticks: { color: "#000", autoSkip: true, maxTicksLimit: 10 },
        grid: { color: "#eee" }
      },
      y: {
        ticks: { color: "#000" },
        grid: { color: "#eee" }
      },
    },
  };

  if (loading) {
    return (
      <Box sx={{
        height: "90vh", display: "flex", justifyContent: "center", alignItems: "center"
      }}>
        <CircularProgress sx={{ color: "#51bfcc" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", padding: "30px", minHeight: "100vh", backgroundColor: "#fff" }}>
      <Typography variant="h2" sx={{ color: "#fe7f2d", fontWeight: "bold", fontFamily: "QuickSand, sans-serif", marginBottom: "5px" }}>
        Reportes
      </Typography>
      <Typography sx={{ color: "#666", fontFamily: "Poppins, sans-serif", marginBottom: "20px" }}>
        {fechaActual}
      </Typography>

      <Grid container spacing={3} direction="column">
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography sx={{ fontWeight: "bold", color: "#fe7f2d", mb: 2, fontFamily: "QuickSand, sans-serif" }}>
              Platillos más vendidos
            </Typography>
            <Box sx={{ height: 300 }}>
              {datosPlatillos && <Bar data={datosPlatillos} options={opciones} />}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography sx={{ fontWeight: "bold", color: "#fe7f2d", mb: 2, fontFamily: "QuickSand, sans-serif" }}>
              Horas de más facturación
            </Typography>
            <Box sx={{ height: 300 }}>
              {datosPorHora && <Line data={datosPorHora} options={opciones} />}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography sx={{ fontWeight: "bold", color: "#fe7f2d", mb: 2, fontFamily: "QuickSand, sans-serif" }}>
              Ingresos por fecha
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
              <TextField type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} size="small" />
              <TextField type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} size="small" />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#fe7f2d", px: 3, borderRadius: "15px",
                  fontFamily: "Poppins, sans-serif", textTransform: 'none'
                }}
                onClick={obtenerIngresosPorFecha}
              >
                Filtrar
              </Button>
            </Box>
            <Box sx={{ height: 300, width: "100%" }}>
              {datosIngresos ? (
                <Line data={datosIngresos} options={opciones} />
              ) : (
                <Typography sx={{ color: "#888", textAlign: "center", mt: 5 }}>
                  No hay datos disponibles para este período.
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminReportes;
