import React from 'react';
import { Card, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const CardDetalle = ({
  orderNumber,
  tableNumber,
  clientName,
  onPayClick,
  onStatusClick
}) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        borderRadius: 2,
        maxWidth: '100%',
        minWidth: '80%',
        position: 'relative',
      }}
    >
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
      >
        <Typography
          variant="h6"
          component="div"
          fontFamily={"Poppins, sans-serif"}
          sx={{ fontWeight: 'bold' }}
        >
          Orden: #{orderNumber}
        </Typography>

        <Typography
          variant="body2"
          component="div"
          fontFamily={"Poppins, sans-serif"}
          sx={{ fontWeight: 'bold' }}
        >
          Mesa: {tableNumber}
        </Typography>

        <Typography
          variant="body2"
          component="div"
          fontFamily={"Poppins, sans-serif"}
          sx={{ fontWeight: 'bold' }}
        >
          Cliente: {clientName}
        </Typography>
      </CardContent>

      <Box sx={{ borderBottom: '1px solid #e0e0e0', marginY: 2, width: '100%' }} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={onPayClick}
          sx={{
            backgroundColor: '#fe7f2d',
            borderRadius: '20px',
            padding: '5px 20px',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          Pagar
        </Button>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <IconButton onClick={onStatusClick} sx={{ color: '#fe7f2d' }}>
          <AddCircleIcon />
        </IconButton>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#f29f05',
            color: 'white',
            borderRadius: '20px',
            padding: '5px 10px',
            fontWeight: 'bold',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          Por pagar
        </Button>
      </Box>
    </Card>
  );
};

export default CardDetalle;
