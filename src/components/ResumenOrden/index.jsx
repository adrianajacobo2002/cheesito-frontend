import React from 'react';
import { Box, Typography, Button, Divider, Grid } from '@mui/material';
import CardOrden from '../Cards/CardOrden';

const ResumenOrden = ({ nuevosPlatillos = [], onOrdenar, onVerDetalle, onDeleteDetalle }) => {
  const agrupados = [];

  nuevosPlatillos.forEach((nuevo) => {
    const precio = Number(nuevo.precio);
    const cantidad = Number(nuevo.cantidad);

    const existente = agrupados.find(p => p.platillo_id === nuevo.platillo_id);
    if (existente) {
      existente.cantidad += cantidad;
      existente.subtotal += precio * cantidad;
    } else {
      agrupados.push({
        ...nuevo,
        cantidad,
        subtotal: precio * cantidad,
      });
    }
  });

  const subtotal = agrupados.reduce((acc, item) => acc + Number(item.subtotal), 0);

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
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Platillos por agregar
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        {agrupados.length === 0 ? (
          <Typography sx={{ fontStyle: 'italic', color: '#888', textAlign: 'center', mt: 2 }}>
            No hay nuevos platillos agregados.
          </Typography>
        ) : (
          <Grid container direction="column" spacing={2}>
            {agrupados.map((detalle, i) => (
              <Grid item key={detalle.platillo_id || i}>
                <CardOrden
                  pizzaName={detalle.nombre}
                  pizzaImage={detalle.imagen_url}
                  price={Number(detalle.precio)}
                  quantity={Number(detalle.cantidad)}
                  onDelete={() => onDeleteDetalle(detalle.platillo_id)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {agrupados.length > 0 && (
        <Typography textAlign="right" sx={{ fontWeight: 'medium', mb: 1 }}>
          Subtotal: ${subtotal.toFixed(2)}
        </Typography>
      )}

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 1, backgroundColor: '#fe7f2d', fontWeight: 'bold', color: 'white' }}
        onClick={onOrdenar}
      >
        Ordenar
      </Button>

      <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 1, borderColor: '#fe7f2d', color: '#fe7f2d', fontWeight: 'bold' }}
        onClick={onVerDetalle}
      >
        Ver detalle completo
      </Button>
    </Box>
  );
};

export default ResumenOrden;
