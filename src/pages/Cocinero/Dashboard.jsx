import React from 'react';
import { Outlet } from 'react-router-dom';
import CocineroNavbar from '../../layouts/CocineroNavbar';
import { Box } from '@mui/material';

const CocineroDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CocineroNavbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default CocineroDashboard;