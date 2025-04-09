import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';
import ordenesService from "../../services/ordenesService";

// Formatear estado para mostrar
const formatearEstado = (estado) => {
  switch (estado.toUpperCase()) {
    case 'EN_PREPARACION':
      return 'En preparación';
    case 'LISTO':
      return 'Listo';
    default:
      return estado;
  }
};

// Obtener color del botón por estado
const obtenerColorBoton = (estado) => {
  switch (estado) {
    case 'Listo':
      return '#51bfcc';
    case 'En preparación':
      return '#f29f05';
    default:
      return '#bdbdbd';
  }
};

const OrdenesComponent = ({ ordenes, fetchOrdenes, marcarComoCompletada }) => {

  const onActualizarEstado = async (id_detalle_orden, estadoActual) => {
    const nuevoEstado = estadoActual.toLowerCase() === 'en preparación' ? 'listo' : 'en preparación';
    try {
      await ordenesService.actualizarEstadoDetalle(id_detalle_orden, nuevoEstado);
      fetchOrdenes();
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  return (
    <>
      {ordenes.map((orden) => {
        const todosListos = orden.detalles.every(
          (detalle) => detalle.estado.toLowerCase() === 'listo'
        );

        return (
          <Card
            key={orden.id_orden}
            sx={{
              width: '100%',
              maxWidth: '700px',
              marginBottom: '20px',
              padding: '20px',
              borderRadius: '15px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', fontFamily: 'Poppins, sans-serif' }}>
                  Orden: #{orden.id_orden}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', fontFamily: 'Poppins, sans-serif' }}>
                  Mesa: {orden.mesa.num_mesa}
                </Typography>
              </Box>

              <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#888', fontFamily: 'Poppins, sans-serif' }}>Platillo</TableCell>
                    <TableCell sx={{ color: '#888', fontFamily: 'Poppins, sans-serif' }}>Cantidad</TableCell>
                    <TableCell sx={{ color: '#888', fontFamily: 'Poppins, sans-serif' }}>Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orden.detalles.map((detalle) => (
                    <TableRow key={detalle.id_detalle_orden}>
                      <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{detalle.platillo.nombre}</TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{detalle.cantidad}</TableCell>
                      <TableCell>
                        <Button
                          sx={{
                            backgroundColor: obtenerColorBoton(formatearEstado(detalle.estado)),
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: "bold",
                            color: 'white',
                            textTransform: 'none',
                            borderRadius: '10px',
                            '&:hover': {
                              backgroundColor: obtenerColorBoton(formatearEstado(detalle.estado)),
                              opacity: 0.8
                            }
                          }}
                          onClick={() => onActualizarEstado(detalle.id_detalle_orden, detalle.estado)}
                        >
                          {formatearEstado(detalle.estado)}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {todosListos && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                  <Button
                    onClick={() => marcarComoCompletada(orden.id_orden)}
                    sx={{
                      backgroundColor: '#fe7f2d',
                      color: '#fff',
                      fontWeight: 'bold',
                      fontFamily: 'Poppins, sans-serif',
                      borderRadius: '30px',
                      paddingX: 3,
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#e56f1f'
                      }
                    }}
                  >
                    Completar pedido
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default OrdenesComponent;
