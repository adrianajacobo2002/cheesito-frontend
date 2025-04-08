import { useState } from "react";
import { Modal, Box, Typography, Button, TextField, MenuItem } from "@mui/material";

const AgregarMesaModal = ({ open, handleClose, handleAgregarMesa }) => {
  const [numMesa, setNumMesa] = useState("");
  const [capacidad, setCapacidad] = useState(2);

  const handleSubmit = () => {
    if (!numMesa || isNaN(parseInt(numMesa))) return;

    handleAgregarMesa(parseInt(numMesa), capacidad);
    setNumMesa("");
    setCapacidad(2);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: "400px",
          padding: "30px",
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontFamily: "Quicksand, sans-serif",
            fontSize: "24px",
            color: "#fe7f2d",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Agregar Mesa
        </Typography>

        <TextField
          label="Número de Mesa"
          fullWidth
          value={numMesa}
          onChange={(e) => setNumMesa(e.target.value)}
          sx={{
            marginBottom: "20px",
            "& .MuiInputBase-root": {
              borderRadius: "10px",
            },
          }}
        />

        <TextField
          select
          label="Capacidad máxima"
          fullWidth
          value={capacidad}
          onChange={(e) => setCapacidad(parseInt(e.target.value))}
          sx={{
            marginBottom: "20px",
            "& .MuiInputBase-root": {
              borderRadius: "10px",
            },
          }}
        >
          <MenuItem value={2}>2 personas</MenuItem>
          <MenuItem value={4}>4 personas</MenuItem>
          <MenuItem value={6}>6 personas</MenuItem>
        </TextField>

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#51bfcc",
            color: "#fff",
            fontWeight: "bold",
            fontFamily: "Quicksand, sans-serif",
            borderRadius: "10px",
            padding: "10px",
            "&:hover": {
              backgroundColor: "#2aa7b6",
            },
          }}
        >
          Agregar Mesa
        </Button>
      </Box>
    </Modal>
  );
};

export default AgregarMesaModal;
