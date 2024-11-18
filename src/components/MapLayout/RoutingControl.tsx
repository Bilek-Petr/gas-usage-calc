import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';

const RoutingControl: React.FC = () => {
   const map = useMap();
   const [waypoints, setWaypoints] = useState<L.LatLng[]>([]);
   const [routingControl, setRoutingControl] = useState<L.Routing.Control | null>(null);

   useEffect(() => {
      if (!map) return;

      //Add the routing control
      const control = L.Routing.control({
         waypoints: [], //start without any waypoints
         routeWhileDragging: true, //point between the initial route
         reverseWaypoints: true,
         geocoder: L.Control.Geocoder.nominatim({ suggest: true }), //user location input, suggests location
      }).addTo(map);

      control.on('routesfound', (e) => {
         const { routes } = e;
         const route = routes[0]; // Taking the first route
         const { summary } = route;

         // Log distance and time
         if (summary) {
            console.log(`Route distance: ${summary.totalDistance} meters`);
            console.log(`Route time: ${summary.totalTime} seconds`);
         }
      });

      L.Routing.errorControl(control).addTo(map);
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
