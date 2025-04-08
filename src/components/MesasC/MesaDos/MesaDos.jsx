import React from 'react';
import { Card, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './MesaDos.css';

const MesaDos = ({ num_mesa, estado, ordenes_activas = [], onClick, onDelete }) => {
  const hayOrdenes = ordenes_activas.length > 0;
  const nombreCliente = hayOrdenes ? ordenes_activas[0].nombre_cliente : 'Disponible';
  const textoCliente = hayOrdenes && ordenes_activas.length > 1
    ? `${nombreCliente} +${ordenes_activas.length - 1}`
    : nombreCliente;

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
        width: '250px'
      }}
    >
      <CardContent style={{ padding: 0 }}>
        <div className="mesa-dos-container">
          <div className="asientos-superiores-dos">
            <div className="asiento-oval"></div>
          </div>
          <div className={`mesa-dos ${estado === 'ocupado' ? 'mesa-ocupada' : 'mesa-disponible'}`}>
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
          <div className="asientos-inferiores-dos">
            <div className="asiento-oval"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MesaDos;
