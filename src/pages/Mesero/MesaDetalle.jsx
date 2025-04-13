import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import mesasService from '../../services/mesasService';
import CardDetalle from '../../components/Cards/CardDetalle';
import CrearOrdenModal from '../../components/Modals/CrearOrdenModal'; // nombre actualizado

const MesaDetalle = () => {
  const { id } = useParams();
  const [ordenes, setOrdenes] = useState([]);
  const [mesaInfo, setMesaInfo] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchMesa = async () => {
      try {
        const data = await mesasService.getByIdMesero(id);
        setMesaInfo(data);
        setOrdenes(data.ordenes || []);
      } catch (error) {
        console.error('Error al obtener la mesa:', error);
      }
    };

    if (id) fetchMesa();
  }, [id]);

  const handlePayClick = (orderId) => {
    console.log(`Pagando orden: ${orderId}`);
  };

  const handleStatusClick = (orderId) => {
    console.log(`Actualizar estado de orden: ${orderId}`);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ color: '#fe7f2d', fontWeight: 'bold', mb: 1 }}>
        Mesa {mesaInfo?.num_mesa}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        {new Date().toLocaleDateString('es-ES')}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleOpenModal}
          sx={{
            backgroundColor: '#fe7f2d',
            borderRadius: '20px',
            fontWeight: 'bold',
            textTransform: 'none',
            px: 3,
          }}
        >
          Nueva Orden
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {ordenes.length > 0 ? (
          ordenes.map((orden) => (
            <CardDetalle
              key={orden.id_orden}
              orderNumber={orden.id_orden}
              tableNumber={mesaInfo?.num_mesa}
              clientName={orden.nombre_cliente}
              quantity={orden.detalles?.length ?? 0}
              totalAmount={`$${orden.factura?.total ?? '0.00'}`}
              onPayClick={() => handlePayClick(orden.id_orden)}
              onStatusClick={() => handleStatusClick(orden.id_orden)}
            />
          ))
        ) : (
          <Typography>No hay órdenes activas en esta mesa.</Typography>
        )}
      </Box>

      {mesaInfo && (
        <CrearOrdenModal open={openModal} onClose={handleCloseModal} mesa={mesaInfo} />
      )}
    </Box>
  );
};

export default MesaDetalle;
