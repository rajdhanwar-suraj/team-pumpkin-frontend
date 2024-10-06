import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const UploadTrip = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
       // Get token from localStorage
       const authToken = localStorage.getItem('authToken');


      const { data } = await axios.post('/api/trips/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${authToken}`
        },
      });
      setUploading(false);
      onUploadSuccess(data.tripData); // Send the new trip data to the parent
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploading(false);
    }
  };

  return (
    <Box mb={3}>
      <Typography variant="h6">Upload a New Trip (CSV)</Typography>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleFileUpload}
        disabled={!file || uploading}
        style={{ marginTop: '10px' }}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </Button>
    </Box>
  );
};

export default UploadTrip;
