import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CardOrden = ({ pizzaName, pizzaImage, price, quantity, onDelete }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        borderRadius: 2,
        position: 'relative',
        paddingX: 7,
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
          margin: '0',
          padding: '10px',
        }}
      />
      <CardContent sx={{ marginLeft: 2 }}>
        <Typography
          variant="body1"
          component="div"
          fontFamily="Poppins, sans-serif"
          fontWeight="bold"
        >
          {pizzaName}
        </Typography>
        <Typography
          variant="body1"
          color="#fe7f2d"
          fontFamily="Poppins, sans-serif"
          fontWeight="bold"
        >
          ${price}
        </Typography>
        <Typography
          variant="body1"
          fontFamily="Poppins, sans-serif"
          fontWeight="bold"
        >
          Cantidad: {quantity}
        </Typography>
      </CardContent>
      <IconButton
        onClick={onDelete}
        sx={{ position: 'absolute', top: 8, right: 8, color: '#fe7f2d' }}
      >
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

export default CardOrden;
