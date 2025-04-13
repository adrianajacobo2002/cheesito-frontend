import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Grid, Tabs, Tab, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


import CardPizzaMesero from "../../components/Cards/CardPizzaMesero";
import ResumenOrden from "../../components/ResumenOrden/index";
import PlatillosService from "../../services/platillosService";
import ordenesService from "../../services/ordenesService";

const MeseroOrdenar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pizzasDisponibles, setPizzasDisponibles] = useState([]);
  const [bebidasDisponibles, setBebidasDisponibles] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [nuevosPlatillos, setNuevosPlatillos] = useState([]);
  const [fechaActual, setFechaActual] = useState("");

  const obtenerFechaActual = () => {
    const hoy = new Date();
    setFechaActual(hoy.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }));
  };

  const fetchPlatillos = async () => {
    try {
      const todos = await PlatillosService.getAllMesero();

      const conStockOriginal = todos.map(p => ({
        ...p,
        inventario: {
          ...p.inventario,
          original: p.inventario.cantidad_disponible,
        }
      }));
      setPizzasDisponibles(conStockOriginal.filter(p => p.tipo === "comida"));
      setBebidasDisponibles(conStockOriginal.filter(p => p.tipo === "bebida"));
    } catch (error) {
      console.error("Error al obtener los platillos:", error);
    }
  };

  const agregarProductoVisualmente = (nuevoPlatillo) => {
    const cantidad = Number(nuevoPlatillo.cantidad);
    if (cantidad <= 0) return;
  
    setNuevosPlatillos((prev) => {
      const existente = prev.find(p => p.platillo_id === nuevoPlatillo.platillo_id);
      if (existente) {
        return prev.map(p =>
          p.platillo_id === nuevoPlatillo.platillo_id
            ? { ...p, cantidad: p.cantidad + cantidad }
            : p
        );
      } else {
        return [...prev, { ...nuevoPlatillo, cantidad }];
      }
    });
  };
  
  const handleOrdenar = async () => {
    if (nuevosPlatillos.length === 0){
      Swal.fire({
        icon: 'info',
        title: 'Sin productos nuevos',
        text: 'No hay productos nuevos que ordenar.',
      });
      return;
    }
    try {
      await ordenesService.agregarPlatillos(id, nuevosPlatillos);
      setNuevosPlatillos([]);

      await fetchPlatillos();

      Swal.fire({
        icon: 'success',
        title: '¡Orden enviada!',
        text: 'Platillos agregados a la orden exitosamente.',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al ordenar:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al ordenar',
        text: 'Ocurrió un error al enviar la orden. Inténtalo nuevamente.',
      });
    }
  };

  const obtenerCantidadAgregada = (platilloId) => {
    const agregado = nuevosPlatillos.find(p => p.platillo_id === platilloId);
    return agregado ? agregado.cantidad : 0;
  };

  const handleEliminarNuevoPlatillo = (platilloId) => {
    const platilloEliminado = nuevosPlatillos.find(p => p.platillo_id === platilloId);
    if (!platilloEliminado) return;
  
    // Restaurar inventario
    setPizzasDisponibles(prev =>
      prev.map(p =>
        p.id_platillo === platilloId
          ? {
              ...p,
              inventario: {
                ...p.inventario,
                cantidad_disponible: Math.min(
                  p.inventario.cantidad_disponible + platilloEliminado.cantidad,
                  p.inventario.original
                ),
              },
            }
          : p
      )
    );
    setNuevosPlatillos(prev => prev.filter(p => p.platillo_id !== platilloId));
  };
  

  
  useEffect(() => {
    obtenerFechaActual();
    fetchPlatillos();
  }, []);

  return (
    <Box sx={{ display: "flex", padding: "20px" }}>
      <Box sx={{ flex: 3, marginRight: "20px" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#fe7f2d" }}>Ordenar</Typography>
        <Typography sx={{ marginBottom: "20px", color: "#666" }}>{fechaActual}</Typography>

        <Divider sx={{ mb: 2 }} />
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label="PIZZAS" />
          <Tab label="BEBIDAS" />
        </Tabs>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          {(tabValue === 0 ? pizzasDisponibles : bebidasDisponibles).map(p => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={p.id_platillo}>
              <CardPizzaMesero
                nombre={p.nombre}
                precio={Number(p.precio)}
                availableUnits={p.inventario.cantidad_disponible}
                imageUrl={p.imagen_url}
                platilloId={p.id_platillo}
                onAddToOrder={(platillo) => agregarProductoVisualmente(platillo)}
                agregados={obtenerCantidadAgregada(p.id_platillo)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <ResumenOrden
        nuevosPlatillos={nuevosPlatillos}
        onOrdenar={handleOrdenar}
        onVerDetalle={() => navigate(`/orden/detalle/${id}`)}
        onDeleteDetalle={handleEliminarNuevoPlatillo}
      />
    </Box>
  );
};

export default MeseroOrdenar;
