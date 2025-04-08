import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const CardListo = ({ pizzaName, pizzaImage, price, quantity, estado, onButtonClick }) => {
  const formatearEstado = (estado) => {
    return estado === 'EN_PREPARACION' ? 'En preparación' : 'Listo';
  };

  const obtenerColorBoton = (estado) => {
    return estado === 'EN_PREPARACION' ? '#f29f05' : '#51bfcc';
  };

  return (
    <div>
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          borderRadius: 2,
          width: '100%',
          position: 'relative',
          boxShadow: 3,
        }}
      >
        <CardMedia
          component="img"
          image={pizzaImage}
          alt={pizzaName}
          sx={{
            width: 90,
            height: 90,
            borderRadius: '20%',
            backgroundColor: '#ffc49e',
            marginRight: '10px',
            padding: '10px',
          }}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="body1"
            component="div"
            fontFamily={"Poppins, sans-serif"}
            sx={{ fontWeight: 'bold' }}
          >
            {pizzaName}
          </Typography>
          <Typography
            variant="body2"
            fontFamily={"Poppins, sans-serif"}
            color="#fe7f2d"
            sx={{ fontWeight: 'bold' }}
          >
            ${price ? price.toFixed(2) : "0.00"}
          </Typography>
          <Typography
            variant="body2"
            fontFamily={"Poppins, sans-serif"}
            sx={{ fontWeight: 'bold' }}
          >
            Cantidad: {quantity}
          </Typography>
        </CardContent>

        <Button
          onClick={onButtonClick}
          sx={{
            backgroundColor: obtenerColorBoton(estado),
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '20px',
            paddingX: '10px',
            height: '30px',
            textTransform: 'none',
            fontSize: '12px',
            position: 'absolute',
            top: 10,
            right: 10,
          }}
        >
          {formatearEstado(estado)}
        </Button>
      </Card>
    </div>
  );
};

export default CardListo;
