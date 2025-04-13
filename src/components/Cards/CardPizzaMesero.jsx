import React, { useState } from 'react';
import {
  Card, CardContent, Typography, CardMedia, Box, Button, TextField,
} from '@mui/material';

const CardPizzaMesero = ({
  nombre,
  precio,
  availableUnits,
  imageUrl,
  onAddToOrder,
  platilloId,
  agregados = 0,
}) => {
  const [quantity, setQuantity] = useState(0);

  const remaining = availableUnits - agregados;

  const handleIncrease = () => {
    if (quantity < remaining) setQuantity(q => q + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) setQuantity(q => q - 1);
  };

  const isOutOfStock = remaining <= 0;
  const disableAdd = isOutOfStock || quantity === 0;

  return (
    <Card sx={{ maxWidth: 340, textAlign: 'center', margin: 'auto', borderRadius: 3, boxShadow: 3, padding: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ color: '#fe7f2d', fontWeight: 'bold' }}>
          {nombre}
        </Typography>
        <CardMedia
          component="img"
          alt={nombre}
          height="180"
          image={imageUrl}
          sx={{ objectFit: 'contain', marginTop: 2 }}
        />
        <Typography variant="h6" color="#fe7f2d" fontWeight="bold">
          ${Number(precio).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Typography component="span" sx={{ fontWeight: 'bold', color: '#fe7f2d', marginRight: 1 }}>
            {remaining}
          </Typography>
          unidades disponibles
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, gap: 1 }}>
          <Button variant="contained" sx={{ backgroundColor: '#fe7f2d', color: 'white' }} onClick={handleDecrease}>-</Button>
          <TextField
            value={quantity}
            inputProps={{ style: { textAlign: 'center' } }}
            sx={{ width: 50, fontWeight: 'bold' }}
            InputProps={{ readOnly: true }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: '#fe7f2d', color: 'white' }}
            onClick={handleIncrease}
            disabled={quantity >= remaining}
          >
            +
          </Button>
        </Box>

        <Button
          variant="contained"
          fullWidth
          disabled={disableAdd}
          sx={{ mt: 2, backgroundColor: '#fe7f2d', fontWeight: 'bold', color: 'white' }}
          onClick={() => {
            onAddToOrder({
              platillo_id: platilloId,
              nombre,
              precio,
              imagen_url: imageUrl,
              cantidad: quantity
            });
            setQuantity(0);
          }}
        >
          {isOutOfStock ? 'Agotado' : 'AGREGAR'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardPizzaMesero;
