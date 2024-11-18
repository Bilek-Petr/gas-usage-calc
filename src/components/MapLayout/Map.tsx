import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';

import RoutingControl from './RoutingControl';

const Map: React.FC = () => {
   return (
      <MapContainer center={[50.084, 15.007]} zoom={8} minZoom={3} className="h-[100vh]">
         <TileLayer
            attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         <RoutingControl />
      </MapContainer>
   );
};

export default Map;
