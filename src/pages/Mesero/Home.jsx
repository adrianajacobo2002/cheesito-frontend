import { useEffect, useState } from "react";
import { Box, Typography, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import mesasService from "../../services/mesasService";
import MesaDos from "../../components/MesasC/MesaDos/MesaDos";
import MesaCuatro from "../../components/MesasC/MesaCuatro/MesaCuatro";
import MesaSeis from "../../components/MesasC/MesaSeis/MesaSeis";

const MeseroHome = () => {
  const [mesas, setMesas] = useState([]);
  const [fechaActual, setFechaActual] = useState("");
  const navigate = useNavigate();

  const obtenerFechaActual = () => {
    const hoy = new Date();
    const fechaFormateada = hoy.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setFechaActual(fechaFormateada);
  };

  const fetchMesas = async () => {
    try {
      const data = await mesasService.getMesasConOrdenes();
      setMesas(data);
    } catch (error) {
      console.error("Error al obtener mesas del mesero", error);
    }
  };

  useEffect(() => {
    obtenerFechaActual();
    fetchMesas();
  }, []);

  const mesasDisponibles = mesas.filter(
    (mesa) => (mesa.estado === "disponible" && (!mesa.ordenes_activas || mesa.ordenes_activas.length === 0))
  ).length;

  const mesasOcupadas = mesas.length - mesasDisponibles;

  return (
    <Box sx={{ padding: "30px", backgroundColor: "#fff", minHeight: "100vh" }}>
      <Typography
        variant="h3"
        sx={{ color: "#fe7f2d", fontWeight: "bold", mb: 1 }}
      >
        Mesas Asignadas
      </Typography>
      <Typography variant="body1" sx={{ color: "#666", mb: 2 }}>
        {fechaActual}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Chip
          label={`Disponible: ${mesasDisponibles}`}
          sx={{ backgroundColor: "#51bfcc", color: "#fff", mr: 1 }}
        />
        <Chip
          label={`Ocupado: ${mesasOcupadas}`}
          sx={{ backgroundColor: "#fe7f2d", color: "#fff" }}
        />
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {mesas.map((mesa) => {
          const nombresClientes =
            mesa.ordenes_activas?.map((orden) => orden.nombre_cliente) || [];

          // Si hay órdenes activas, consideramos la mesa como ocupada
          const estadoVisual = nombresClientes.length > 0 ? 'ocupado' : mesa.estado;

          const commonProps = {
            num_mesa: mesa.num_mesa,
            estado: estadoVisual,
            ordenes_activas: nombresClientes,
            onClick: () => navigate(`mesa-detalle/${mesa.id_mesa}`),
          };

          if (mesa.capacidad === 2)
            return <MesaDos key={mesa.id_mesa} {...commonProps} />;
          if (mesa.capacidad === 4)
            return <MesaCuatro key={mesa.id_mesa} {...commonProps} />;
          if (mesa.capacidad === 6)
            return <MesaSeis key={mesa.id_mesa} {...commonProps} />;
          return null;
        })}
      </Box>
    </Box>
  );
};

export default MeseroHome;
