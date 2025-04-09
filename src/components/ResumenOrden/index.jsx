import React from 'react';
import { Box, Typography, Button, Divider, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CardOrden from '../Cards/CardOrden';

const ResumenOrden = ({ detallesOrden, onDeleteDetalle }) => {
  const navigate = useNavigate();

  const calcularSubtotal = () => {
    return detallesOrden
      .reduce((total, detalle) => total + detalle.subtotal, 0)
      .toFixed(2);
  };

  const handleOrder = () => {
    navigate('/mesero/home');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: 3,
        borderRadius: '15px',
        position: 'sticky',
        top: '20px',
        height: 'calc(100vh - 40px)',
        marginLeft: 'auto',
        maxWidth: 480,
        minWidth: 480,
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px', fontFamily: 'Poppins, sans-serif' }}>
        Detalle de la Orden
      </Typography>

      <Divider sx={{ marginBottom: '20px' }} />

      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          marginBottom: '20px',
        }}
      >
        <Grid container direction="column" spacing={2}>
          {detallesOrden.map((detalle) => (
            <Grid item key={detalle.id_detalle_orden}>
              <Box sx={{ fontFamily: 'Poppins, sans-serif' }}>
                <CardOrden
                  pizzaName={detalle.platillo.nombre}
                  pizzaImage={detalle.platillo.imagen_url}
                  price={detalle.platillo.precio.toFixed(2)}
                  quantity={detalle.cantidad}
                  onDelete={() => onDeleteDetalle(detalle.id_detalle_orden)}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          fontFamily: 'Poppins, sans-serif',
          marginTop: 'auto',
          textAlign: 'right',
          paddingBottom: "15px"
        }}
      >
        Subtotal: ${calcularSubtotal()}
      </Typography>

      <Button
        variant="contained"
        fullWidth
        sx={{
          marginTop: '10px',
          backgroundColor: '#fe7f2d',
          fontWeight: 'bold',
          color: 'white',
          fontFamily: 'Poppins, sans-serif'
        }}
        onClick={handleOrder}
      >
        Ordenar
      </Button>
    </Box>
  );
};

export default ResumenOrden;
