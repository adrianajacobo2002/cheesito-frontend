import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../layouts/AdminNavbar';
import { Box } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AdminNavbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
