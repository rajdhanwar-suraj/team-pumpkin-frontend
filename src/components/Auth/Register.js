import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [registering, setRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setRegistering(true);
      const { data } = await axios.post('/api/auth/register', { name, email, password });
      localStorage.setItem('authToken', data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      setRegistering(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={2} textAlign="center">
        <Typography variant="h4">Register</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
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
            {registering ? 'Registering...' : 'Register'}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Register;
