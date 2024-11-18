import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import ReactDOM from 'react-dom';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';

import RoutingControl from './RoutingControl';
import GasInput from '../SidePanel/GasInput';

const Map: React.FC = () => {
   const [container, setContainer] = useState<HTMLElement | null>(null); // State to store the routing container

   useEffect(() => {
      const checkContainer = () => {
         const leafletContainer = document.querySelector('.leaflet-container');
         if (leafletContainer) {
            const routingContainer = leafletContainer.querySelector(
               '.leaflet-routing-container',
            );
            if (routingContainer) {
               setContainer(routingContainer as HTMLElement);
            }
         }
      };
      setTimeout(checkContainer, 100);

      return () => {
         // Clean up if the component is unmounted
         setContainer(null);
      };
   }, []);

   return (
      <MapContainer
         center={[50.084, 15.007]}
         zoom={8}
         minZoom={3}
         className="h-[100vh] w-9/12"
         whenCreated={(map) => {
            console.log('Map created:', map);
         }}
      >
         <TileLayer
            attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         <RoutingControl />

         {/* Render the GasInput inside the leaflet-routing-container */}
         {container && ReactDOM.createPortal(<GasInput />, container)}
      </MapContainer>
   );
};

export default Map;
