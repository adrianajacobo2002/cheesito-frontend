import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import CardDetalle from "../../components/Cards/CardDetalle";

const MesaDetalle = () => {
  const ordenes = [
    {
      orderNumber: '0001',
      tableNumber: 1,
      clientName: 'Alejandro Gonzales',
      quantity: 3,
      totalAmount: '$16.50',
    },
    {
      orderNumber: '0002',
      tableNumber: 1,
      clientName: 'Guillermo Ramos',
      quantity: 2,
      totalAmount: '$12.50',
    },
    {
      orderNumber: '0003',
      tableNumber: 1,
      clientName: 'Claudia Hernandez',
      quantity: 1,
      totalAmount: '$6.75',
    },
  ];

  const handlePayClick = (orderNumber) => {
    console.log(`Pagando orden: ${orderNumber}`);
  };

  const handleStatusClick = (orderNumber) => {
    console.log(`Actualizar estado de orden: ${orderNumber}`);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ color: '#fe7f2d', fontWeight: 'bold', mb: 1 }}>
        Mesa 1
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        {new Date().toLocaleDateString('es-ES')}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#fe7f2d',
            borderRadius: '20px',
            fontWeight: 'bold',
            textTransform: 'none',
            px: 3,
          }}
        >
          Nueva Orden
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {ordenes.map((orden) => (
          <CardDetalle
            key={orden.orderNumber}
            orderNumber={orden.orderNumber}
            tableNumber={orden.tableNumber}
            clientName={orden.clientName}
            quantity={orden.quantity}
            totalAmount={orden.totalAmount}
            onPayClick={() => handlePayClick(orden.orderNumber)}
            onStatusClick={() => handleStatusClick(orden.orderNumber)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MesaDetalle;
