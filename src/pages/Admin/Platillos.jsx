import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Button, Tabs, Tab, CircularProgress
} from '@mui/material';
import CardPizza from '../../components/Cards/CardPizza';
import PlatilloModal from '../../components/Modals/PlatilloModal';
import AgregarPlatilloModal from '../../components/Modals/AgregarPlatilloModal';
import PlatillosService from '../../services/platillosService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AdminPlatillos = () => {
  const [pizzasDisponibles, setPizzasDisponibles] = useState([]);
  const [bebidasDisponibles, setBebidasDisponibles] = useState([]);
  const [selectedPlatillo, setSelectedPlatillo] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openAgregarModal, setOpenAgregarModal] = useState(false);
  const [cantidad, setCantidad] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const todos = await PlatillosService.getAll();
        const pizzas = todos.filter(p => p.tipo === 'comida');
        const bebidas = todos.filter(p => p.tipo === 'bebida');
        setPizzasDisponibles(pizzas);
        setBebidasDisponibles(bebidas);
      } catch (error) {
        console.error('Error al obtener platillos', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  const handleCantidadChange = (event) => {
    setCantidad(event.target.value);
  };

  const handleGuardarCambios = async () => {
    if (!selectedPlatillo) return;

    const nuevaCantidad = parseInt(cantidad);

    if (isNaN(nuevaCantidad) || nuevaCantidad <= 0) {
      handleCloseModal();
      setTimeout(() => {
        Swal.fire('Error', 'La cantidad debe ser un número mayor a cero.', 'error');
      }, 100);
      return;
    }

    try {
      await PlatillosService.agregarStock(selectedPlatillo.inventario.id_inventario, nuevaCantidad);

      const actualizados = (tabValue === 0 ? pizzasDisponibles : bebidasDisponibles).map(item =>
        item.id_platillo === selectedPlatillo.id_platillo
          ? {
              ...item,
              inventario: {
                ...item.inventario,
                cantidad_disponible: item.inventario.cantidad_disponible + nuevaCantidad,
              },
            }
          : item
      );

      tabValue === 0
        ? setPizzasDisponibles(actualizados)
        : setBebidasDisponibles(actualizados);

      handleCloseModal();
      setTimeout(() => {
        Swal.fire(
          'Stock Actualizado',
          `Se agregó ${nuevaCantidad} al stock de ${selectedPlatillo.nombre}.`,
          'success'
        );
      }, 100);
    } catch (error) {
      console.error(error);
      handleCloseModal();
      setTimeout(() => {
        Swal.fire('Error', 'No se pudo actualizar el stock.', 'error');
      }, 100);
    }
  };

  const handleAgregarPlatillo = async (formData) => {
    try {
      await PlatillosService.create(formData);
      const todos = await PlatillosService.getAll();
      const pizzas = todos.filter(p => p.tipo === 'comida');
      setPizzasDisponibles(pizzas);
      setOpenAgregarModal(false);

      Swal.fire('Platillo Agregado', 'El platillo ha sido agregado correctamente.', 'success').then(() => {
        navigate('/admin/platillos');
      });
    } catch (error) {
      console.error('Error al agregar platillo:', error);
    }
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCloseAgregarModal = () => {
    setOpenAgregarModal(false);
  };

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#fff",
      padding: "20px",
      minHeight: loading ? "100vh" : "auto"
    }}>
      {loading ? (
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}>
          <CircularProgress sx={{ color: "#51bfcc" }} />
        </Box>
      ) : (
        <>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={9}>
              <Typography variant="h2" sx={{ color: "#fe7f2d", fontWeight: "bold", fontFamily: "QuickSand, sans-serif" }}>
                Stock Disponible
              </Typography>
            </Grid>
            <Grid item xs={3} container justifyContent="flex-end" spacing={2} sx={{ marginTop: "50px" }}>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#fe7f2d",
                    "&:hover": { backgroundColor: "#e56f1f" },
                    color: "#fff",
                    fontWeight: "bold",
                    fontFamily: "QuickSand, sans-serif"
                  }}
                  onClick={() => setOpenAgregarModal(true)}
                >
                  Agregar a Stock
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#51bfcc",
                    "&:hover": { backgroundColor: "#2aa7b6" },
                    color: "#fff",
                    fontWeight: "bold",
                    fontFamily: "QuickSand, sans-serif"
                  }}
                  onClick={() => PlatillosService.exportarPDF()}
                >
                  Exportar PDF
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
            <Tabs
              value={tabValue}
              onChange={handleChangeTab}
              TabIndicatorProps={{ style: { backgroundColor: '#fe7f2d' } }}
            >
              <Tab label="Pizzas" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: tabValue === 0 ? '#fe7f2d' : '#000' }} />
              <Tab label="Bebidas" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: tabValue === 1 ? '#fe7f2d' : '#000' }} />
            </Tabs>
          </Box>

          <Grid container spacing={3}>
            {(tabValue === 0 ? pizzasDisponibles : bebidasDisponibles).map((platillo) => (
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

          <PlatilloModal
            platillo={selectedPlatillo}
            open={openModal}
            cantidad={cantidad}
            handleClose={handleCloseModal}
            handleCantidadChange={handleCantidadChange}
            handleGuardarCambios={handleGuardarCambios}
          />

          <AgregarPlatilloModal
            open={openAgregarModal}
            handleClose={handleCloseAgregarModal}
            handleAgregarPlatillo={handleAgregarPlatillo}
          />
        </>
      )}
    </Box>
  );
};

export default AdminPlatillos;
