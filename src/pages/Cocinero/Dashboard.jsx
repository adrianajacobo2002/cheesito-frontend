import React from "react";
import { Outlet } from "react-router-dom";
import CocineroNavbar from "../../layouts/CocineroNavbar";
import { Box } from "@mui/material";

const CocineroDashboard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflowX: "hidden",
      }}
    >
      <CocineroNavbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#fff", // Cambialo si querés fondo
          paddingX: "80px",
          paddingY: "50px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default CocineroDashboard;
