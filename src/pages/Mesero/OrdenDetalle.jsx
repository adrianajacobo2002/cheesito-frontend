import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import CardListo from '../../components/Cards/CardListo'; // Ajustá según tu estructura

const OrdenDetalle = () => {
  const productos = [
    {
      pizzaName: 'Pizza 1',
      pizzaImage: '/ruta/a/pizza.jpg',
      price: 5.0,
      quantity: 1,
      estado: 'LISTO',
    },
    {
      pizzaName: 'Pizza 1',
      pizzaImage: '/ruta/a/pizza.jpg',
      price: 5.0,
      quantity: 1,
      estado: 'LISTO',
    },
  ];

  const subtotal = productos.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const propina = subtotal * 0.1;
  const total = subtotal + propina;

  return (
    <Box sx={{ padding: 4 }}>
      {/* Encabezado */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ color: '#fe7f2d', fontWeight: 'bold' }}>
            Orden #0001
          </Typography>
          <Typography sx={{ fontWeight: 'bold' }}>Alejandro Gonzales</Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#fe7f2d',
            borderRadius: '20px',
            px: 3,
            textTransform: 'none',
          }}
        >
          Pagar
        </Button>
      </Box>

      {/* Contenedor blanco */}
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: '20px',
          padding: 3,
          boxShadow: 3,
        }}
      >
        {/* Título */}
        <Typography sx={{ fontWeight: 'bold', mb: 2 }}>Detalle de la orden</Typography>

        {/* Productos en grid que se adapta al ancho */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 2,
            mb: 2,
          }}
        >
          {productos.map((p, i) => (
            <CardListo
              key={i}
              pizzaName={p.pizzaName}
              pizzaImage={p.pizzaImage}
              price={p.price}
              quantity={p.quantity}
              estado={p.estado}
              onButtonClick={() => console.log('clic')}
            />
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Detalle de pago */}
        <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Detalle de pago</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography color="text.secondary">Subtotal:</Typography>
          <Typography sx={{ color: '#fe7f2d' }}>${subtotal.toFixed(2)}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography color="text.secondary">Propina (10%):</Typography>
          <Typography sx={{ color: '#fe7f2d' }}>${propina.toFixed(2)}</Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography fontWeight="bold">Total:</Typography>
          <Typography fontWeight="bold" sx={{ color: '#000' }}>
            ${total.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OrdenDetalle;
