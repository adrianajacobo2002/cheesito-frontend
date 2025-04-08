import React from 'react';
import { Outlet } from 'react-router-dom';
import MeseroNavbar from '../../layouts/MeseroNavbar';
import { Box } from '@mui/material';

const CocineroDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <MeseroNavbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default CocineroDashboard;
