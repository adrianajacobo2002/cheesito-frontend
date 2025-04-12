import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ordenesService from "../../services/ordenesService";
import OrdenModal from "../../components/Modals/OrdenModal";

const AdminOrdenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const [open, setOpen] = useState(false);
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
      const data = await ordenesService.getHistorialOrdenes();
      setOrdenes(data);
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = async (orden) => {
    try {
      const detalleCompleto = await ordenesService.getDetalleHistorial(orden.id_orden);
      setOrdenSeleccionada(detalleCompleto);
      setOpen(true);
    } catch (error) {
      console.error("Error al cargar detalle de la orden:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOrdenSeleccionada(null);
  };

  useEffect(() => {
    obtenerFechaActual();
    fetchOrdenes();
  }, []);

  const aplicarFiltros = () => {
    return ordenes.filter((orden) => {
      const coincideCliente = orden.nombre_cliente
        .toLowerCase()
        .includes(filtroNombre.toLowerCase());

      const fechaOrden = new Date(orden.fecha);
      const desde = fechaInicio ? new Date(fechaInicio) : null;
      const hasta = fechaFin ? new Date(fechaFin) : null;

      const dentroDeRango =
        (!desde || fechaOrden >= desde) && (!hasta || fechaOrden <= hasta);

      return coincideCliente && dentroDeRango;
    });
  };

  const ordenesFiltradas = aplicarFiltros();

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <CircularProgress sx={{ color: "#51bfcc" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "30px", backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          color: "#fe7f2d",
          fontFamily: "QuickSand, sans-serif",
        }}
      >
        Historial de Ordenes
      </Typography>
      <Typography
        sx={{
          color: "#333",
          marginBottom: "20px",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {fechaActual}
      </Typography>

      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Cliente"
            fullWidth
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
            sx={{ fontFamily: "Poppins, sans-serif" }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Fecha Inicio"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            sx={inputDateStyle}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Fecha Fin"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            sx={inputDateStyle}
          />
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {["#", "Fecha", "Cliente", "Mesa", "SubTotal", "Total", "Ver Más"].map((col, idx) => (
                <TableCell
                  key={idx}
                  sx={{ fontWeight: "bold", fontFamily: "QuickSand, sans-serif" }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ordenesFiltradas.map((orden, index) => {
              const subtotal = orden.factura?.subtotal;
              const total = orden.factura?.total;

              return (
                <TableRow key={orden.id_orden}>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#fe7f2d",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                    {new Date(orden.fecha).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                    {orden.nombre_cliente}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                    M{orden.mesa?.num_mesa || "-"}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                    {subtotal ? `$${parseFloat(subtotal).toFixed(2)}` : "--"}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                    {total ? `$${parseFloat(total).toFixed(2)}` : "--"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#51bfcc",
                        borderRadius: "10px",
                        "&:hover": { backgroundColor: "#2aa7b6" },
                      }}
                      onClick={() => handleOpen(orden)}
                    >
                      <VisibilityIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <OrdenModal open={open} orden={ordenSeleccionada} onClose={handleClose} />
    </Box>
  );
};

const inputDateStyle = {
  fontFamily: "Poppins, sans-serif",
  "& .MuiInputBase-root": {
    fontFamily: "Poppins, sans-serif",
  },
  "& .MuiInputBase-input": {
    color: "#000",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fe7f2d",
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fe7f2d",
  },
  "& .MuiInputLabel-root": {
    fontFamily: "Poppins, sans-serif",
    color: "#fe7f2d",
  },
  "& .Mui-focused": {
    color: "#fe7f2d",
  },
};

export default AdminOrdenes;
