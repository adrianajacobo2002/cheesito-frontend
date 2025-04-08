import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, Tabs, Tab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import CardPizza from "../../components/Cards/CardPizza";
import CardNoDisponible from "../../components/Cards/CardNoDisponible";
import PlatilloModal from "../../components/Modals/PlatilloModal";
import PlatillosService from "../../services/platillosService";

const AdminHome = () => {
  const [pizzasDisponibles, setPizzasDisponibles] = useState([]);
  const [pizzasFueraStock, setPizzasFueraStock] = useState([]);
  const [bebidasFueraStock, setBebidasFueraStock] = useState([]);
  const [selectedPlatillo, setSelectedPlatillo] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [cantidad, setCantidad] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [fechaActual, setFechaActual] = useState("");

  const navigate = useNavigate();

  const obtenerFechaActual = () => {
    const hoy = new Date();
    const fechaFormateada = hoy.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setFechaActual(fechaFormateada);
  };

  const fetchPlatillos = async () => {
    try {
      const todos = await PlatillosService.getAll();

      const disponibles = todos.filter(p => p.inventario.cantidad_disponible > 0 && p.tipo === 'comida');
      const fueraStockComida = todos.filter(p => p.inventario.cantidad_disponible === 0 && p.tipo === 'comida');
      const fueraStockBebida = todos.filter(p => p.inventario.cantidad_disponible === 0 && p.tipo === 'bebida');

      setPizzasDisponibles(disponibles);
      setPizzasFueraStock(fueraStockComida);
      setBebidasFueraStock(fueraStockBebida);
    } catch (err) {
      console.error("Error al obtener platillos:", err);
    }
  };

  useEffect(() => {
    obtenerFechaActual();
    fetchPlatillos();
  }, []);

  const handleCardClick = (platillo) => {
    setSelectedPlatillo(platillo);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPlatillo(null);
    setCantidad('');
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCantidadChange = (e) => {
    setCantidad(e.target.value);
  };

  const handleGuardarCambios = async () => {
    const cantidadInt = parseInt(cantidad);
    if (isNaN(cantidadInt) || cantidadInt <= 0) {
      handleCloseModal();
      setTimeout(() => {
        Swal.fire('Error', 'La cantidad debe ser un número mayor a cero.', 'error');
      }, 100);
      return;
    }

    try {
      await PlatillosService.agregarStock(selectedPlatillo.inventario.id_inventario, cantidadInt);
      handleCloseModal();
      setTimeout(() => {
        Swal.fire('Stock Actualizado', 'El stock fue modificado correctamente.', 'success');
      }, 100);
      fetchPlatillos();
    } catch (err) {
      console.error(err);
      handleCloseModal();
      setTimeout(() => {
        Swal.fire('Error', 'No se pudo actualizar el stock.', 'error');
      }, 100);
    }
  };

  const handleEliminar = async () => {
    if (selectedPlatillo.inventario.cantidad_disponible > 0) {
      handleCloseModal();
      setTimeout(() => {
        Swal.fire('No permitido', 'No puedes eliminar un platillo con stock mayor a cero.', 'warning');
      }, 100);
      return;
    }

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await PlatillosService.delete(selectedPlatillo.id_platillo);
        handleCloseModal();
        setTimeout(() => {
          Swal.fire('Eliminado', 'El platillo fue eliminado correctamente.', 'success');
        }, 100);
        fetchPlatillos();
      } catch (err) {
        console.error(err);
        handleCloseModal();
        setTimeout(() => {
          Swal.fire('Error', 'No se pudo eliminar el platillo.', 'error');
        }, 100);
      }
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "#fff", padding: "20px", minHeight: "100vh" }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={9}>
          <Typography variant="h2" sx={{ color: "#fe7f2d", fontWeight: "bold", fontFamily: "QuickSand, sans-serif" }}>
            Bienvenido Admin
          </Typography>
          <Typography sx={{ color: "#666", fontFamily: "Poppins, sans-serif" }}>{fechaActual}</Typography>
          <Typography variant="h4" sx={{ color: "#fe7f2d", fontWeight: "bold", fontFamily: "QuickSand, sans-serif", mt: 1 }}>
            Disponibles en Stock
          </Typography>
        </Grid>
        <Grid item xs={3} container justifyContent="flex-end" sx={{ marginTop: "50px" }}>
          {pizzasDisponibles.length > 5 && (
            <Button
              variant="contained"
              sx={{ backgroundColor: "#fe7f2d", "&:hover": { backgroundColor: "#e56f1f" }, color: "#fff", fontWeight: "bold", fontFamily: "QuickSand, sans-serif" }}
              onClick={() => navigate("/admin/platillos")}
            >
              Ver más
            </Button>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {pizzasDisponibles.slice(0, 5).map((platillo) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={platillo.id_platillo}>
            <CardPizza
              nombre={platillo.nombre}
              imagen={platillo.imagen_url}
              disponibles={platillo.inventario.cantidad_disponible}
              onClick={() => handleCardClick(platillo)}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ width: "100%", textAlign: "left", marginTop: "40px" }}>
        <Typography variant="h4" sx={{ color: "#fe7f2d", fontWeight: "bold", fontFamily: "QuickSand, sans-serif" }}>
          Fuera de Stock
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          TabIndicatorProps={{ style: { backgroundColor: '#fe7f2d' } }}
        >
          <Tab label="Comida" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: tabValue === 0 ? '#fe7f2d' : '#000' }} />
          <Tab label="Bebidas" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: tabValue === 1 ? '#fe7f2d' : '#000' }} />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {(tabValue === 0 ? pizzasFueraStock : bebidasFueraStock).map((platillo) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={platillo.id_platillo}>
            <CardNoDisponible
              pizzaName={platillo.nombre}
              pizzaImage={platillo.imagen_url}
              availability="No disponible"
              onClick={() => handleCardClick(platillo)}
            />
          </Grid>
        ))}
      </Grid>

      <PlatilloModal
        platillo={selectedPlatillo}
        open={openModal}
        cantidad={cantidad}
        handleClose={handleCloseModal}
        handleCantidadChange={handleCantidadChange}
        handleGuardarCambios={handleGuardarCambios}
        handleEliminar={handleEliminar}
      />
    </Box>
  );
};

export default AdminHome;
