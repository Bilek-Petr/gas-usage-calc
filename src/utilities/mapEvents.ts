// mapEvents.ts
import L from 'leaflet';

// A utility function that handles map clicks and updates waypoints
export const handleMapClick = (
   map: L.Map,
   setWaypoints: React.Dispatch<React.SetStateAction<L.LatLng[]>>,
) => {
   const handleClick = (e: L.LeafletMouseEvent) => {
      const newPoint = L.latLng(e.latlng.lat, e.latlng.lng);

      // Update the waypoints
      setWaypoints((prevWaypoints) => {
         const updatedWaypoints = [...prevWaypoints, newPoint];
         return updatedWaypoints.slice(0, 2); // Limit to 2 waypoints
      });
   };

   map.on('click', handleClick);

   // Return a cleanup function to remove the listener
   return () => {
      map.off('click', handleClick);
   };
};
