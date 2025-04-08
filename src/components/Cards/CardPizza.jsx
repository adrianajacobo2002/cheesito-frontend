import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box } from '@mui/material';

const CardPizza = ({ nombre, imagen, disponibles, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        width: 225, 
        height: 260,
        padding: '20px 18px',
        textAlign: 'center',
        borderRadius: 2,
        boxShadow: 3,
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
    >
      <CardMedia
        component="img"
        alt={nombre}
        image={imagen}
        sx={{
          height: 110,
          maxWidth: 120,
          margin: '0 auto',
          objectFit: 'contain',
          backgroundColor: '#fff',
        }}
      />
      <CardContent>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#fe7f2d',
            fontFamily: 'Quicksand, sans-serif',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {nombre}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Quicksand, sans-serif',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Disponibles:
          </Typography>
          <Typography
            variant="body2"
            component="span"
            sx={{ fontWeight: 'bold', color: 'black', marginLeft: 1 }}
          >
            {disponibles}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardPizza;
