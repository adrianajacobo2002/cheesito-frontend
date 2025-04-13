import React, { use, useEffect, useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import meserosService from "../../services/meserosService";
import ordenesService from "../../services/ordenesService";

const CrearOrdenModal = ({ open, onClose, mesa }) => {
  const [meseros, setMeseros] = useState([]);
  const [meseroId, setMeseroId] = useState(null);
  const [nombreCliente, setNombreCliente] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeseros = async () => {
      try {
        const data = await meserosService.getAll();
        setMeseros(data);
      } catch (error) {
        console.error("Error al obtener los meseros:", error);
      }
    };

    if (open) {
      fetchMeseros();
      setNombreCliente("");
      setMeseroId(null);
    }
  }, [open]);

  const handleCrearOrden = async () => {
    if (meseroId && nombreCliente.trim() !== "") {
      try {
        const response = await ordenesService.crearOrden(
          mesa.id_mesa,
          nombreCliente,
          meseroId
        );
        const id_orden = response.orden.id_orden;

        onClose();
        navigate(`/mesero/ordenar/${id_orden}`);
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          "Ocurrió un error al crear la orden.";
        onClose();
        setTimeout(() => {
          Swal.fire({
            icon: "warning",
            title: "No se pudo crear la orden",
            text: message,
            confirmButtonColor: "#fe7f2d",
          });
        }, 100);

        console.error("Error al crear la orden:", error);
      }
    } else {
      onClose();
      setTimeout(() => {
        Swal.fire({
          icon: "info",
          title: "Campos requeridos",
          text: "Por favor, selecciona un mesero e ingresa el nombre del cliente.",
          confirmButtonColor: "#fe7f2d",
        });
      }, 100);
     
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: "12px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontFamily: "QuickSand, sans-serif",
            fontWeight: "bold",
            color: "#fe7f2d",
          }}
        >
          Crear orden
        </Typography>

        <TextField
          select
          label="Host Encargado"
          value={meseroId || ""}
          color="warning"
          onChange={(e) => setMeseroId(Number(e.target.value))}
          fullWidth
          sx={{ mb: 2 }}
        >
          {meseros.map((mesero) => (
            <MenuItem key={mesero.id_mesero} value={mesero.id_mesero}>
              {mesero.nombre} ({mesero.codigo})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Nombre Cliente"
          value={nombreCliente}
          color="warning"
          onChange={(e) => setNombreCliente(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          onClick={handleCrearOrden}
          sx={{
            backgroundColor: "#fe7f2d",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            color: "white",
            textTransform: "none",
            width: "100%",
          }}
        >
          Crear orden
        </Button>
      </Box>
    </Modal>
  );
};

export default CrearOrdenModal;
