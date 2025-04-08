import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/authService';
import '../../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await AuthService.login(email, password);
      const { access_token, user } = response.data;

      // Guardar datos
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirigir según el rol
      const rol = user.rol.toLowerCase();

      switch (rol) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'mesero':
          navigate('/mesero/dashboard');
          break;
        case 'cocinero':
          navigate('/cocinero/dashboard');
          break;
        default:
          navigate('/no-access');
      }
    } catch (error) {
      console.error('Error en login:', error);
      setErrorMessage('Credenciales inválidas');
    }
  };

  return (
    <div style={styles.container}>
      <Paper 
        elevation={3} 
        sx={{ 
          paddingY: '40px',
          paddingX: '70px',
          borderRadius: '15px',
          width: '100%', 
          maxWidth: '450px',
          textAlign: 'center'
        }}
      >
        <div style={styles.formContent}>
          <Typography 
            variant="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold', 
              color: '#fe7f2d', 
              fontFamily: 'QuickSand, sans-serif',
              fontSize: '2.5rem',
              marginBottom: '20px'
            }}
          >
            Bienvenido
          </Typography>

          {errorMessage && (
            <Typography color="error" sx={{ marginBottom: '20px' }}>
              {errorMessage}
            </Typography>
          )}

          <TextField
            label="Correo electrónico"
            variant="outlined"
            fullWidth
            margin="normal"
            color="warning"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 3, fontFamily: 'Poppins, sans-serif', backgroundColor: '#fff' }}  
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            fullWidth
            type="password"
            margin="normal"
            color="warning"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 4, fontFamily: 'Poppins, sans-serif', backgroundColor: '#fff' }}  
          />
          <Button 
            variant="contained" 
            color="warning"
            fullWidth
            onClick={handleLogin}
            sx={{ 
              padding: '12px', 
              backgroundColor: '#fe7f2d', 
              ':hover': { backgroundColor: '#fe7f2d' }, 
              fontFamily: 'Poppins, sans-serif',
              borderRadius: '15px',
              fontSize: '1rem',
              textTransform: 'none'
            }}  
          >
            Iniciar Sesión
          </Button>
        </div>
      </Paper>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#bfbfbf',
    padding: 0,
    margin: 0,
  },
  formContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default Login;
