import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box } from '@mui/material';

const CardPizza = ({ nombre, imagen, disponibles, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        width: '100%',
        height: '250px',
        padding: '28px',
        paddingY: '8px',
        textAlign: 'center',
        borderRadius: 2,
        boxShadow: 3,
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardMedia
        component="img"
        alt={nombre}
        image={imagen}
        sx={{
          height: 140,
          objectFit: 'contain',
          backgroundColor: 'white',
        }}
      />
      <CardContent>
        <Typography
          variant="body1"
          component="div"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#fe7f2d',
            marginLeft: 1,
            fontFamily: 'Quicksand, sans-serif',
          }}
        >
          {nombre}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 1,
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
