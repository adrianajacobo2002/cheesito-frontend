import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Grid, Tabs, Tab } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CardPizzaMesero from '../../components/Cards/CardPizzaMesero';
import ResumenOrden from '../../components/ResumenOrden/ResumenOrden';

const MeseroOrdenar = () => {
  const { id_orden } = useParams();
  const [pizzasDisponibles, setPizzasDisponibles] = useState([]);
  const [bebidasDisponibles, setBebidasDisponibles] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [detallesOrden, setDetallesOrden] = useState([]);
  const [fechaActual, setFechaActual] = useState("");

  const obtenerFechaActual = () => {
    const hoy = new Date();
    const fechaFormateada = hoy.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    setFechaActual(fechaFormateada);
  };

  const fetchPizzas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/inventario/pizzas/disponibles');
      setPizzasDisponibles(response.data);
    } catch (error) {
      console.error('Error al obtener las pizzas disponibles:', error);
    }
  };

  const fetchBebidas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/inventario/bebidas/disponibles');
      setBebidasDisponibles(response.data);
    } catch (error) {
      console.error('Error al obtener las bebidas disponibles:', error);
    }
  };

  const fetchDetallesOrden = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/ordenes/${id_orden}`);
      setDetallesOrden(response.data.detalleOrden);
    } catch (error) {
      console.error('Error al obtener los detalles de la orden:', error);
    }
  };

  useEffect(() => {
    obtenerFechaActual();
    fetchPizzas();
    fetchBebidas();
    fetchDetallesOrden();
  }, []);

  const handleDeleteDetalle = async (id_detalle_orden) => {
    try {
      await axios.delete(`http://localhost:3000/api/ordenes/detalles/${id_detalle_orden}`);
      setDetallesOrden((prev) => prev.filter((d) => d.id_detalle_orden !== id_detalle_orden));
      fetchPizzas();
      fetchBebidas();
    } catch (error) {
      console.error('Error al eliminar el detalle:', error);
      alert('Hubo un problema al eliminar el detalle');
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const agregarProductoAOrden = async (platillo_id, cantidad, tipo) => {
    if (cantidad > 0) {
      try {
        const detalles = [{ platillo_id, cantidad }];
        await axios.post(`http://localhost:3000/api/ordenes/${id_orden}/platillos`, { detalles });

        if (tipo === 'pizza') {
          setPizzasDisponibles((prev) =>
            prev.map((p) =>
              p.platillo_id === platillo_id
                ? { ...p, cantidad_disponible: p.cantidad_disponible - cantidad }
                : p
            )
          );
        } else if (tipo === 'bebida') {
          setBebidasDisponibles((prev) =>
            prev.map((b) =>
              b.platillo_id === platillo_id
                ? { ...b, cantidad_disponible: b.cantidad_disponible - cantidad }
                : b
            )
          );
        }

        fetchDetallesOrden();
      } catch (error) {
        console.error('Error al agregar el producto a la orden:', error);
        alert('Hubo un problema al agregar el producto');
      }
    } else {
      alert('La cantidad debe ser mayor a 0');
    }
  };

  return (
    <Box sx={{ display: 'flex', padding: '20px', fontFamily: 'Poppins, sans-serif' }}>
      <Box sx={{ flex: 3, marginRight: '20px' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: '20px', color: '#fe7f2d', fontFamily: 'QuickSand, sans-serif' }}>
          Ordenar
        </Typography>
        <Typography sx={{ marginBottom: "20px", fontWeight: "light", color: "#666", textAlign: 'left' }}>
          {fechaActual}
        </Typography>
        <Divider sx={{ marginBottom: '20px' }} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered={false}
            TabIndicatorProps={{ style: { backgroundColor: '#fe7f2d' } }}
          >
            <Tab label="Pizzas" sx={{
              color: tabValue === 0 ? '#fe7f2d' : '#000',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 'bold',
              '&.Mui-selected': { color: '#fe7f2d' }
            }} />
            <Tab label="Bebidas" sx={{
              color: tabValue === 1 ? '#fe7f2d' : '#000',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 'bold',
              '&.Mui-selected': { color: '#fe7f2d' }
            }} />
          </Tabs>
        </Box>

        <Divider sx={{ marginBottom: '20px' }} />

        {tabValue === 0 && (
          <Grid container spacing={2}>
            {pizzasDisponibles.map((pizza) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={pizza.platillo.id_platillos}>
                <CardPizzaMesero
                  nombre={pizza.platillo.nombre}
                  precio={pizza.platillo.precio}
                  availableUnits={pizza.cantidad_disponible}
                  imageUrl={`http://localhost:3000/uploads/${pizza.platillo.image_url}`}
                  onAddToOrder={(cantidad) => {
                    agregarProductoAOrden(pizza.platillo.id_platillos, cantidad, 'pizza');
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {tabValue === 1 && (
          <Grid container spacing={2}>
            {bebidasDisponibles.map((bebida) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={bebida.platillo.id_platillos}>
                <CardPizzaMesero
                  nombre={bebida.platillo.nombre}
                  precio={bebida.platillo.precio}
                  availableUnits={bebida.cantidad_disponible}
                  imageUrl={`http://localhost:3000/uploads/${bebida.platillo.image_url}`}
                  onAddToOrder={(cantidad) => {
                    agregarProductoAOrden(bebida.platillo.id_platillos, cantidad, 'bebida');
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <ResumenOrden detallesOrden={detallesOrden} onDeleteDetalle={handleDeleteDetalle} />
    </Box>
  );
};

export default MeseroOrdenar;
