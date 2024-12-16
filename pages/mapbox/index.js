import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Mapbox() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const token = "pk.eyJ1IjoiYW50aG9ueWhhbSIsImEiOiJjbTJvNzM3YncwZTdrMnFvaDB6YTM0N3d1In0.QbT0NmfPH6PWVT9o615f6Q";

  useEffect(() => {
    mapboxgl.accessToken = token;

    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current, // container ID
        style: 'mapbox://styles/mapbox/navigation-night-v1', // dusk/night style
        center: [-80.3762, 25.7566], // FIU coordinates [lng, lat]
        zoom: 16, // starting zoom for a closer look
        pitch: 60, // tilt for a 3D view
        bearing: -17.6 // orientation for a better angle
      });

      // Add 3D buildings with improved extrusion and shadow effects
      mapRef.current.on('load', () => {
        mapRef.current.addLayer({
          'id': '3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#555', // Darker building color
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.8
          }
        });

        // Set up dynamic lighting to cast shadows
        mapRef.current.setLight({
          anchor: 'viewport', // light moves with the camera
          color: 'white', // Light color
          intensity: 0.5, // Light intensity for subtle shadows
          position: [1.15, 90, 80] // Custom light position for shadow casting
        });
      });
    }

    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, [token]);

  return (
    <div className="pt-20">
      <p>Hello</p>
      {/* Ensure the map container has width and height */}
      <div
        id="map-container"
        ref={mapContainerRef}
        style={{ width: '100%', height: '500px' }} // Add dimensions to the container
      />
    </div>
  );
}
