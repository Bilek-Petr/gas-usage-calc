import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const RoutingControl: React.FC = () => {
   const map = useMap();
   const [waypoints, setWaypoints] = useState<L.LatLng[]>([]);
   const [routingControl, setRoutingControl] = useState<L.Routing.Control | null>(null);

   useEffect(() => {
      if (!map) return;

      // Initialize the routing control but don't add any waypoints initially
      const control = L.Routing.control({
         waypoints: [],
         routeWhileDragging: true,
      }).addTo(map);

      setRoutingControl(control);

      return () => {
         if (control) {
            map.removeControl(control);
         }
      };
   }, [map]);

   useEffect(() => {
      if (routingControl && waypoints.length > 0) {
         routingControl.setWaypoints(waypoints);
      }
   }, [waypoints, routingControl]);

   useEffect(() => {
      if (!map) return;

      const handleMapClick = (e: L.LeafletMouseEvent) => {
         const newPoint = L.latLng(e.latlng.lat, e.latlng.lng);

         // Add the new waypoint to the state
         setWaypoints((prev) => {
            const updatedWaypoints = [...prev, newPoint];
            return updatedWaypoints.slice(0, 2); // Limit to 2 waypoints
         });
      };

      map.on('click', handleMapClick);

      return () => {
         map.off('click', handleMapClick);
      };
   }, [map]);

   return null;
};

export default RoutingControl;
