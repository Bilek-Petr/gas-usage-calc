import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';

export const useRoutingControl = (map: L.Map | null) => {
   const [routingControl, setRoutingControl] = useState<L.Routing.Control | null>(null);
   const [waypoints, setWaypoints] = useState<L.LatLng[]>([]);

   useEffect(() => {
      if (!map) return;

      // Create and add routing control to the map
      const control = L.Routing.control({
         waypoints: [], // No initial waypoints
         routeWhileDragging: true,
         reverseWaypoints: true,
         geocoder: L.Control.Geocoder.nominatim({ suggest: true }),
      });

      // Handle route found
      control.on('routesfound', (e) => {
         const { routes } = e;
         const route = routes[0]; // First route
         const { summary } = route;

         if (summary) {
            console.log(`Route distance: ${summary.totalDistance} meters`);
            console.log(`Route time: ${summary.totalTime} seconds`);
         }
      });

      // Add the control to the map
      control.addTo(map); // map should be passed to the hook or accessible

      // Save routingControl in state
      setRoutingControl(control);

      return () => {
         // Cleanup the control on unmount
         control.remove();
      };
   }, [map]);

   useEffect(() => {
      if (routingControl && waypoints.length > 0) {
         routingControl.setWaypoints(waypoints); // Update the waypoints
      }
   }, [waypoints, routingControl]);

   return { routingControl, setWaypoints };
};
