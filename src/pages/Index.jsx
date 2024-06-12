import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, Text, VStack } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom icon for the map markers
const pinIcon = new L.Icon({
  iconUrl: require('../assets/pin-icon.png'),
  iconRetinaUrl: require('../assets/pin-icon.png'),
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

// Dummy data for buildings in Oslo
const buildings = [
  { id: 1, position: [59.9139, 10.7522], name: 'Building 1', sensorData: { temperature: '20°C', humidity: '30%', occupancy: '60%' } },
  { id: 2, position: [59.9149, 10.7522], name: 'Building 2', sensorData: { temperature: '21°C', humidity: '35%', occupancy: '80%' } },
  // Add more buildings as needed
];

const Index = () => {
  const [activeBuilding, setActiveBuilding] = useState(null);

  return (
    <MapContainer center={[59.9139, 10.7522]} zoom={13} style={{ height: '100vh', width: '100vw' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {buildings.map((building) => (
        <Marker
          key={building.id}
          position={building.position}
          icon={pinIcon}
          eventHandlers={{
            click: () => {
              setActiveBuilding(building);
            },
          }}
        />
      ))}
      {activeBuilding && (
        <Popup
          position={activeBuilding.position}
          onClose={() => {
            setActiveBuilding(null);
          }}
        >
          <VStack>
            <Text fontWeight="bold">{activeBuilding.name}</Text>
            <Box>
              <Text>Temperature: {activeBuilding.sensorData.temperature}</Text>
              <Text>Humidity: {activeBuilding.sensorData.humidity}</Text>
              <Text>Occupancy: {activeBuilding.sensorData.occupancy}</Text>
            </Box>
          </VStack>
        </Popup>
      )}
    </MapContainer>
  );
};

export default Index;