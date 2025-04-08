import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, Button, TextField, Typography, Box, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PlatilloModal = ({
  platillo,
  open,
  cantidad,
  handleClose,
  handleCantidadChange,
  handleGuardarCambios,
  handleEliminar
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ style: { borderRadius: '20px', padding: '20px', maxWidth: '400px' } }}
    >
      <DialogTitle sx={{ padding: 0 }}>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {platillo && (
          <Box sx={{ textAlign: 'center' }}>
            <img
              src={platillo.platillo.imagen_url}
              alt={platillo.platillo.nombre}
              style={{
                width: '180px', height: '180px', objectFit: 'cover', borderRadius: '50%', marginBottom: '20px'
              }}
            />
            <Typography variant="h5" sx={{ color: '#fe7f2d', fontWeight: 'bold' }}>
              {platillo.platillo.nombre}
            </Typography>
            <Typography>Disponibles: {platillo.cantidad_disponible}</Typography>

            <TextField
              label="Cantidad a agregar"
              value={cantidad}
              onChange={handleCantidadChange}
              fullWidth
              sx={{ my: 2, '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
            />

            <Button
              variant="contained"
              onClick={handleGuardarCambios}
              sx={{
                backgroundColor: '#51bfcc', color: '#fff', fontWeight: 'bold', borderRadius: '10px', mr: 2
              }}
            >
              Guardar Cambios
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleEliminar}
              sx={{ fontWeight: 'bold', borderRadius: '10px' }}
            >
              Eliminar
            </Button>

            <Typography variant="body2" sx={{ mt: 2, color: 'gray', fontSize: '12px' }}>
              Nota: Si el stock actual es mayor a cero no es posible eliminar
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PlatilloModal;
