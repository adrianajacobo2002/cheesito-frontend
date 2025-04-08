import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const CardNoDisponible = ({ pizzaName, pizzaImage, availability, onClick }) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          width: '100%',
          height: 120,
          boxShadow: 3,
        }}
      >
        <CardMedia
          component="img"
          image={pizzaImage}
          alt={pizzaName}
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            objectFit: 'cover',
            fontWeight: 'bold',
          }}
        />
        <CardContent sx={{ marginLeft: 2 }}>
          <Typography variant="body1" component="div">
            {pizzaName}
          </Typography>
          <Typography
            variant="body2"
            color="#d50000"
            sx={{ fontWeight: 'bold' }}
          >
            {availability}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardNoDisponible;
