import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import Swal from 'sweetalert2';

const EliminarPlatilloModal = ({ open, onClose, platillo, onConfirm }) => {
  const [cantidad, setCantidad] = useState(1);

  const handleConfirm = () => {
    if (cantidad <= 0 || cantidad > platillo.cantidad) {
      Swal.fire('Error', 'Cantidad inválida', 'error');
      return;
    }
    onConfirm(platillo, cantidad);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        backgroundColor: '#fff',
        borderRadius: 3,
        boxShadow: 24,
        p: 4,
        width: 400,
        mx: 'auto',
        mt: '15%',
        fontFamily: 'Poppins, sans-serif'
      }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Eliminar platillo
        </Typography>

        {platillo && (
          <>
            <Typography><strong>Nombre:</strong> {platillo.nombre}</Typography>
            <Typography><strong>Cantidad actual:</strong> {platillo.cantidad}</Typography>

            <TextField
              label="Cantidad a eliminar"
              type="number"
              fullWidth
              sx={{ mt: 2 }}
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              inputProps={{ min: 1, max: platillo.cantidad }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3 }}>
              <Button onClick={onClose} variant="outlined">Cancelar</Button>
              <Button onClick={handleConfirm} variant="contained" color="error">Eliminar</Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default EliminarPlatilloModal;
