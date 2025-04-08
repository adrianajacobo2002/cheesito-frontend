import React from 'react';
import {
  Box,
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/ExitToAppRounded';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import cheesito from '../../assets/img/cheesito.png';

// Ancho del Drawer
const drawerWidth = 80;

// Estilo del Drawer cuando está cerrado (solo íconos)
const closedMixin = (theme) => ({
  width: drawerWidth,
  overflowX: 'hidden',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up('sm')]: {
    width: drawerWidth,
  },
});

// Drawer estilizado
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...closedMixin(theme),
}));

// Estilo de íconos
const iconStyle = {
  color: '#fe7f2d',
  fontSize: '32px',
};

const MeseroNavbar = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Logo */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: '20px',
          }}
        >
          <img src={cheesito} alt="Logo" style={{ width: '40px', height: '40px' }} />
        </Box>

        {/* Íconos de navegación */}
        <List sx={{ width: '100%' }}>
          <ListItem disablePadding sx={{ marginY: 2, justifyContent: 'center' }}>
            <ListItemButton component={NavLink} to="/mesero/home" sx={{ justifyContent: 'center', display: 'flex' }}>
              <ListItemIcon sx={{ justifyContent: 'center' }}>
                <HomeIcon style={iconStyle} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ marginY: 2, justifyContent: 'center' }}>
            <ListItemButton component={NavLink} to="/mesero/ordenes" sx={{ justifyContent: 'center', display: 'flex' }}>
              <ListItemIcon sx={{ justifyContent: 'center' }}>
                <RoomServiceIcon style={iconStyle} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />

        {/* Cerrar sesión */}
        <Box sx={{ flexGrow: 1 }} />
        <List sx={{ width: '100%' }}>
          <ListItem disablePadding sx={{ marginY: 2, justifyContent: 'center' }}>
            <ListItemButton component={NavLink} to="/login" sx={{ justifyContent: 'center', display: 'flex' }}>
              <ListItemIcon sx={{ justifyContent: 'center' }}>
                <LogoutIcon style={iconStyle} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default MeseroNavbar;
