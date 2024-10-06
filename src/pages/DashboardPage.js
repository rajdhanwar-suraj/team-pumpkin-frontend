import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import UploadTrip from '../components/Trip/UploadTrip';
import TripList from '../components/Trip/TripList';
import MapView from '../components/Trip/MapView';
import { fetchTrips } from '../services/apiService'; // Use updated service

const DashboardPage = () => {
  const [tripData, setTripData] = useState(null);
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Fetch previously uploaded trips
  useEffect(() => {
    const loadTrips = async () => {
      try {
        const data = await fetchTrips();
        setTrips(data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };
    loadTrips();
  }, []);

  // Handle CSV upload and display the new trip
  const handleUploadSuccess = async (newTripData) => {
    setTripData(newTripData);
    setSelectedTrip(null); // Clear selected trip if any
  };

  // Handle selection of a previous trip
  const handleSelectTrip = (trip) => {
    setTripData(trip.tripData);
    setSelectedTrip(trip);
  };

  return (
    <Container>
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Vehicle Trip Dashboard
        </Typography>

        {/* CSV Upload Section */}
        <UploadTrip onUploadSuccess={handleUploadSuccess} />

        {/* Show previous trips and button to view on map */}
        <TripList trips={trips} onSelectTrip={handleSelectTrip} />

        {/* Display Map if trip data is available */}
        {tripData && (
          <Box mt={5}>
            <MapView tripData={tripData} />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default DashboardPage;
