import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../layouts/AdminNavbar';
import { Box } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh', overflowX: 'hidden' }}>
      <AdminNavbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#fff', // Cambialo si querés fondo
          paddingX: '80px',
          paddingY: '50px'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
