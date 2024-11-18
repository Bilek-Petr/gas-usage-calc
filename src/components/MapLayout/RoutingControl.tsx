import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

interface RoutingControlProps {
   waypoints: [number, number][];
}

const RoutingControl: React.FC<RoutingControlProps> = ({ waypoints }) => {
   const map = useMap();

   useEffect(() => {
      if (!map) return;

      // Create and add the routing control
      const routingControl = L.Routing.control({
         waypoints: waypoints.map((coords) => L.latLng(coords[0], coords[1])),
         routeWhileDragging: true,
      }).addTo(map);

      // Cleanup function to remove the routing control properly
      return () => {
         if (routingControl) {
            map.removeControl(routingControl);
         }
      };
   }, [map, waypoints]);

   return null;
};

export default RoutingControl;
