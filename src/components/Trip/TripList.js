import React from 'react';
import { List, ListItem, ListItemText, Paper, Button, Typography } from '@mui/material';

const TripList = ({ trips, onSelectTrip }) => {
  return (
    <Paper style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6">Previously Uploaded Trips</Typography>
      <List>
        {trips.length === 0 && <ListItem>No trips uploaded yet.</ListItem>}
        {trips.map((trip) => (
          <ListItem key={trip._id} button>
            <ListItemText primary={`Trip ID: ${trip._id}`} secondary={`Total Distance: ${trip.totalDistance} meters`} />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onSelectTrip(trip)}
              style={{ marginLeft: '10px' }}
            >
              View Trip
            </Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TripList;
