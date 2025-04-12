import React, { useEffect, useState } from "react";
import MesaDos from "../../components/MesasC/MesaDos/MesaDos";
import MesaCuatro from "../../components/MesasC/MesaCuatro/MesaCuatro";
import MesaSeis from "../../components/MesasC/MesaSeis/MesaSeis";
import AgregarMesaModal from "../../components/Modals/AgregarMesaModal";
import Swal from "sweetalert2";
import mesasService from "../../services/mesasService";
import {
  Box,
  Button,
  Typography,
  Grid,
  Chip,
  CircularProgress,
} from "@mui/material";

const AdminMesas = () => {
  const [mesas, setMesas] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [fechaActual, setFechaActual] = useState("");
  const [loading, setLoading] = useState(true);

  const obtenerFechaActual = () => {
    const hoy = new Date();
    const fechaFormateada = hoy.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setFechaActual(fechaFormateada);
  };

  const fetchMesas = async () => {
    try {
      setLoading(true);
      const mesasData = await mesasService.getAll();
      const mesasOrdenadas = mesasData.sort((a, b) => a.id_mesa - b.id_mesa);
      setMesas(mesasOrdenadas);
    } catch (error) {
      console.error("Error al obtener las mesas", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerFechaActual();
    fetchMesas();
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleAgregarMesa = async (numMesa, capacidad) => {
    try {
      await mesasService.create({ num_mesa: numMesa, capacidad });
      fetchMesas();
      handleCloseModal();
    } catch (error) {
      console.error("Error al agregar la mesa", error);
      Swal.fire("Error", "No se pudo agregar la mesa", "error");
    }
  };

  const handleEliminarMesa = async (id_mesa, estado) => {
    if (estado === "ocupado") {
      Swal.fire({
        title: "Error",
        text: "No se puede eliminar una mesa que está ocupada.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminarla",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await mesasService.delete(id_mesa);
          fetchMesas();
          Swal.fire("Eliminado", "La mesa ha sido eliminada.", "success");
        } catch (error) {
          console.error("Error al eliminar la mesa", error);
          Swal.fire("Error", "Hubo un problema al eliminar la mesa.", "error");
        }
      }
    });
  };

  const mesasDisponibles = mesas.filter(
    (mesa) => mesa.estado === "disponible"
  ).length;
  const mesasOcupadas = mesas.filter(
    (mesa) => mesa.estado === "ocupado"
  ).length;

  // Mostrar solo spinner si está cargando
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
        <Grid item xs={9}>
          <Typography
            variant="h2"
            sx={{
              color: "#fe7f2d",
              marginBottom: "10px",
              fontWeight: "bold",
              textAlign: "left",
              fontFamily: "QuickSand, sans-serif",
            }}
          >
            Administrar Mesas
          </Typography>
          <Typography
            sx={{
              marginBottom: "10px",
              fontWeight: "light",
              color: "#666",
              textAlign: "left",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {fechaActual}
          </Typography>
        </Grid>
        <Grid item xs={3} container justifyContent="flex-end" sx={{ marginTop: "50px" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#51bfcc",
              "&:hover": { backgroundColor: "#2aa7b6" },
              color: "#fff",
              fontWeight: "bold",
              fontFamily: "QuickSand, sans-serif",
              padding: "10px 20px",
              textTransform: "none"
            }}
            onClick={handleOpenModal}
          >
            Agregar Mesas
          </Button>
        </Grid>
      </Grid>

      <Typography variant="body1" component="div" sx={{ marginBottom: "10px" }}>
        <Chip
          label={`Disponible: ${mesasDisponibles}`}
          sx={{
            backgroundColor: "#51bfcc",
            color: "#fff",
            marginRight: "10px",
          }}
        />
        <Chip
          label={`Ocupado: ${mesasOcupadas}`}
          sx={{ backgroundColor: "#fe7f2d", color: "#fff" }}
        />
      </Typography>

      <Box sx={{ marginTop: "20px", display: "flex", flexWrap: "wrap" }}>
        {mesas.map((mesa) => {
          const handleDelete = () =>
            handleEliminarMesa(mesa.id_mesa, mesa.estado);

          const props = {
            num_mesa: mesa.num_mesa,
            estado: mesa.estado,
            ordenes_activas: mesa.ordenes_activas,
            onDelete: handleDelete,
          };

          if (mesa.capacidad === 2)
            return <MesaDos key={mesa.id_mesa} {...props} />;
          if (mesa.capacidad === 4)
            return <MesaCuatro key={mesa.id_mesa} {...props} />;
          if (mesa.capacidad === 6)
            return <MesaSeis key={mesa.id_mesa} {...props} />;

          return null;
        })}
      </Box>

      <AgregarMesaModal
        open={openModal}
        handleClose={handleCloseModal}
        handleAgregarMesa={handleAgregarMesa}
      />
    </Box>
  );
};

export default AdminMesas;
