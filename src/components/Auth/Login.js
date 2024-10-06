import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoggingIn(true);
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('authToken', data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setLoggingIn(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={2} textAlign="center">
        <Typography variant="h4">Login</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {loggingIn ? 'Logging in...' : 'Login'}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
