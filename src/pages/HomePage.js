import React, { useState } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  // If already logged in, redirect to the dashboard
  if (isAuthenticated()) {
    navigate('/dashboard');
  }

  return (
    <Container maxWidth="md">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Welcome to Vehicle Travel Dashboard
        </Typography>
        {showLogin ? <Login /> : <Register />}
        <Button
          variant="text"
          onClick={() => setShowLogin(!showLogin)}
          style={{ marginTop: '10px' }}
        >
          {showLogin ? 'Need to Register?' : 'Already Registered? Log in'}
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
