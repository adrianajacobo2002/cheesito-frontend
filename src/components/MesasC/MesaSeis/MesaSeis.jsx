import React from 'react';
import { Card, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './MesaSeis.css';

const MesaSeis = ({ num_mesa, estado, ordenes_activas = [], onClick, onDelete }) => {
  const hayOrdenes = ordenes_activas.length > 0;

  let textoCliente = 'Disponible';
  if (hayOrdenes) {
    // Extraer nombres dependiendo si son strings o objetos
    const nombres = ordenes_activas.map((o) =>
      typeof o === 'string' ? o : o.nombre_cliente
    );

    if (nombres.length === 1) {
      textoCliente = nombres[0];
    } else if (nombres.length === 2) {
      textoCliente = `${nombres[0]}, ${nombres[1]}`;
    } else {
      textoCliente = `${nombres[0]}, ${nombres[1]} +${nombres.length - 2}`;
    }
  }

  return (
    <Card
      onClick={onClick}
      className={`mesa-card ${estado === 'ocupado' ? 'mesa-ocupada' : 'mesa-disponible'}`}
      style={{
        cursor: 'pointer',
        display: 'inline-block',
        backgroundColor: 'transparent',
        padding: '20px',
        margin: '10px',
        borderRadius: '20px',
        boxShadow: 'none',
        width: '400px'
      }}
    >
      <CardContent style={{ padding: 0 }}>
        <div className="mesa-seis-container">
          <div className="asientos-superiores">
            <div className="asiento-oval"></div>
            <div className="asiento-oval"></div>
            <div className="asiento-oval"></div>
          </div>
          <div className={`mesa-seis ${estado === 'ocupado' ? 'mesa-ocupada' : 'mesa-disponible'}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h5 style={{ fontFamily: 'QuickSand, sans-serif', fontWeight: 'bold' }}>Mesa {num_mesa}</h5>
              {onDelete && (
                <IconButton onClick={(e) => { e.stopPropagation(); onDelete(); }} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </div>
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.9rem',
                textAlign: 'center',
                wordBreak: 'break-word',
                lineHeight: '1.2',
                marginTop: '5px'
              }}
            >
              {textoCliente}
            </p>
          </div>
          <div className="asientos-inferiores">
            <div className="asiento-oval"></div>
            <div className="asiento-oval"></div>
            <div className="asiento-oval"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MesaSeis;
