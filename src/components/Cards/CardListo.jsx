import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CardListo = ({
  pizzaName,
  pizzaImage,
  price,
  quantity,
  estado,
  idDetalle, // 👈 ID del detalle recibido como prop
  onButtonClick,
  onDeleteClick
}) => {
  const estadoFormateado = estado.toLowerCase();

  const formatearEstado = (estado) => {
    return estado.toLowerCase() === 'en preparación' ? 'En preparación' : 'Listo';
  };

  const obtenerColorBoton = (estado) => {
    return estado.toLowerCase() === 'en preparación' ? '#f29f05' : '#51bfcc';
  };

  return (
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
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{pizzaName}</Typography>
        <Typography variant="body2" color="#fe7f2d" sx={{ fontWeight: 'bold' }}>
          ${price.toFixed(2)}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          Cantidad: {quantity}
        </Typography>
      </CardContent>

      {/* Ícono de eliminar si está en preparación */}
      {estadoFormateado === 'en preparación' && (
        <IconButton
          onClick={() =>
            onDeleteClick({
              id_detalle: idDetalle,
              nombre: pizzaName,
              imagen_url: pizzaImage,
              precio: price,
              cantidad: quantity,
              estado: estado
            })
          }
          sx={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            color: '#fe7f2d',
            backgroundColor: '#fff',
            borderRadius: '50%',
            boxShadow: 1,
            zIndex: 1
          }}
        >
          <DeleteIcon />
        </IconButton>
      )}

      {/* Botón de estado */}
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
  );
};

export default CardListo;
