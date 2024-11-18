import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';

import RoutingControl from './RoutingControl';

const Map: React.FC = () => {
   const waypoints: [number, number][] = [
      [57.74, 11.94],
      [57.6792, 11.949],
   ];

   return (
      <MapContainer center={[57.74, 11.94]} zoom={13} className="h-[100vh]">
         <TileLayer
            attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         <RoutingControl waypoints={waypoints} />
      </MapContainer>
   );
};

export default Map;
