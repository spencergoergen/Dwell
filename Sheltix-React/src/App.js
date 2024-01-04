import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.css';

const MichiganCountiesMap = () => {
  // Define states here if needed using useState

  // React useEffect for initializing the map
  React.useEffect(() => {
    mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-85, 43],
      zoom: 8,
    });

    // Rest of your map-related logic

    // Cleanup function (if needed) when the component unmounts
    return () => {
      map.remove(); // Remove the map instance to prevent memory leaks
    };
  }, []);

  // JSX structure for your component
  return (
    <div>
      {/* Your HTML structure converted into React components */}
      {/* Use React components, useState, useEffect, etc., based on your requirements */}
    </div>
  );
};

export default MichiganCountiesMap;