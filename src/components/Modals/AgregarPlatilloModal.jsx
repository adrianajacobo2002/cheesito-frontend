import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  MenuItem,
  Box,
  IconButton,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';

const AgregarPlatilloModal = ({ open, handleClose, handleAgregarPlatillo }) => {
  const [formValues, setFormValues] = useState({
    nombre: '',
    precio: '',
    tipo: 'comida',
  });
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!formValues.nombre || !formValues.precio || !imageFile) {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nombre', formValues.nombre);
      formData.append('precio', parseFloat(formValues.precio));
      formData.append('tipo', formValues.tipo);
      formData.append('imagen', imageFile);

      await handleAgregarPlatillo(formData);

      Swal.fire({
        title: 'Platillo agregado',
        text: 'El platillo ha sido agregado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      setFormValues({
        nombre: '',
        precio: '',
        tipo: 'comida',
      });
      setImageFile(null);
      handleClose();
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al agregar el platillo. Inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          borderRadius: '20px',
          width: '500px',
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontFamily: 'Quicksand, sans-serif',
          fontWeight: 'bold',
          color: '#fe7f2d',
        }}
      >
        Agregar Platillo
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
        >
          <Box sx={{ marginBottom: 2 }}>
            {imageFile ? (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            ) : (
              <img
                src="https://placehold.co/200x200?text=Sin+Imagen"
                alt="Placeholder"
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            )}
          </Box>

          <Button
            variant="contained"
            component="label"
            sx={{
              backgroundColor: '#51bfcc',
              fontWeight: 'bold',
              fontFamily: 'Quicksand, sans-serif',
              padding: '10px 20px',
              borderRadius: '10px',
              '&:hover': {
                backgroundColor: '#2aa7b6',
              },
            }}
          >
            Subir Imagen
            <PublishRoundedIcon />
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>

          <TextField
            label="Nombre del Platillo"
            name="nombre"
            value={formValues.nombre}
            onChange={handleInputChange}
            fullWidth
            sx={{
              marginBottom: 2,
              '& .MuiOutlinedInput-root': { borderRadius: '10px' },
              fontFamily: 'Poppins, sans-serif',
            }}
          />
          <TextField
            label="Precio"
            name="precio"
            value={formValues.precio}
            onChange={handleInputChange}
            fullWidth
            sx={{
              marginBottom: 2,
              '& .MuiOutlinedInput-root': { borderRadius: '10px' },
              fontFamily: 'Poppins, sans-serif',
            }}
          />
          <TextField
            select
            label="Tipo"
            name="tipo"
            value={formValues.tipo}
            onChange={handleInputChange}
            fullWidth
            sx={{
              marginBottom: 2,
              '& .MuiOutlinedInput-root': { borderRadius: '10px' },
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            <MenuItem value="comida">Comida</MenuItem>
            <MenuItem value="bebida">Bebida</MenuItem>
          </TextField>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              width: '100%',
              backgroundColor: '#fe7f2d',
              color: '#fff',
              fontWeight: 'bold',
              fontFamily: 'Quicksand, sans-serif',
              padding: '10px 20px',
              borderRadius: '10px',
              '&:hover': {
                backgroundColor: '#e56f1f',
              },
            }}
          >
            Agregar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AgregarPlatilloModal;
