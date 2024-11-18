import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useRoutingControl } from '../../hooks/useRoutingControl';
import { handleMapClick } from '../../utilities/mapEvents';

const RoutingControl: React.FC = () => {
   const map = useMap();
   const { routingControl, setWaypoints } = useRoutingControl(map);

   useEffect(() => {
      if (!map) return;

      // Pass setWaypoints to map event handler
      const removeClickListener = handleMapClick(map, setWaypoints);

      return () => {
         //unmount
         removeClickListener();
      };
   }, [map, setWaypoints]);

   return null;
};

export default RoutingControl;
