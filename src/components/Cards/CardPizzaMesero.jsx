import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Button,
  TextField,
} from '@mui/material';

const CardPizzaMesero = ({ nombre, precio, availableUnits, imageUrl, onAddToOrder }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 340,
        textAlign: 'center',
        margin: 'auto',
        borderRadius: 3,
        boxShadow: 3,
        padding: 2,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{
            color: '#fe7f2d',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
          }}
        >
          {nombre}
        </Typography>
        <CardMedia
          component="img"
          alt={nombre}
          height="180"
          image={imageUrl}
          sx={{ objectFit: 'contain', marginTop: 2 }}
        />
        <Typography
          variant="h6"
          component="div"
          color="#fe7f2d"
          fontWeight={'bold'}
          fontFamily={'Poppins, sans-serif'}
          gutterBottom
        >
          {precio !== undefined ? `$${precio.toFixed(2)}` : 'Precio no disponible'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Typography
            component="span"
            sx={{ fontWeight: 'bold', color: '#fe7f2d', marginRight: 1 }}
          >
            {availableUnits}
          </Typography>
          unidades disponibles
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 2,
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#fe7f2d',
              color: 'white',
              fontWeight: 'bold',
            }}
            onClick={handleDecrease}
          >
            -
          </Button>
          <TextField
            value={quantity}
            inputProps={{ style: { textAlign: 'center' } }}
            sx={{
              width: 50,
              '& .MuiInputBase-input': { padding: '0.5rem' },
              fontWeight: 'bold',
            }}
            InputProps={{
              readOnly: true,
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#fe7f2d',
              color: 'white',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 'bold',
            }}
            onClick={handleIncrease}
          >
            +
          </Button>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{
            marginTop: 2,
            backgroundColor: '#fe7f2d',
            fontWeight: 'bold',
            color: 'white',
            fontFamily: 'Poppins, sans-serif',
            textTransform: 'none',
          }}
          onClick={() => onAddToOrder(quantity)}
        >
          AGREGAR
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardPizzaMesero;
