"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import geoJson from "./chicago-parks.json";

// taken from https://github.com/mapbox/mapbox-react-examples/blob/master/markers-default/src/Map.js

mapboxgl.accessToken = process.env.NEXT_MAPBOX_ACCESS_TOKEN as string;

export const MapboxMap = () => {
  const mapContainerRef = useRef("");

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-87.65, 41.84],
      zoom: 10,
    });

    // Create default markers
    geoJson.features.map((feature) =>
      new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map)
    );

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};
