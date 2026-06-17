import { useState, useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";
import TimeSlider from "./components/TimeSlider/TimeSlider";
// import boundariesgeojson from "./data/geoJson/boundaries.geo.json";

function App() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  const [targetYear, setTargetYear] = useState<number | string>(2000);

  useEffect(() => {
    if (!mapContainer?.current) return;
    const map = new maplibregl.Map({
      container: mapContainer?.current, // container id
      style: "https://tiles.openfreemap.org/styles/fiord", // style URL
      center: [0.1282, 51.508], // starting position [lng, lat]
      zoom: 4.75, // starting zoom
    });

    mapRef.current = map;

    // map.on("load", () => {
    //   // Add boundaries layer
    //   map.addSource("boundaries", {
    //     type: "geojson",
    //     data: boundariesgeojson,
    //   });

    //   map.addLayer({
    //     id: "boundaries-layer",
    //     type: "line",
    //     source: "boundaries",
    //     paint: {
    //       "line-color": "#ffffff",
    //       "line-width": 2,
    //     },
    //   });
    // });

    return () => {
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    async function fetchLandsat() {
      try {
        const response = await fetch(`${baseUrl}/gee/landsat`);
        const data = await response.json();

        if (mapRef.current) {
          // Remove old layer if exists
          if (mapRef.current.getSource("ee-layer")) {
            mapRef.current.removeLayer("ee-layer");
            mapRef.current.removeSource("ee-layer");
          }

          mapRef.current.addSource("ee-layer", {
            type: "raster",
            tiles: [data.url],
            tileSize: 256,
          });

          mapRef.current.addLayer({
            id: "ee-layer",
            type: "raster",
            source: "ee-layer",
            paint: { "raster-opacity": 0.85 },
          });
        }
      } catch (error) {
        console.error("Failed to load GEE layer: ", error);
      }
    }
    fetchLandsat();
  }, []);

  return (
    <main>
      <div ref={mapContainer} id='map' className='map'></div>
      <TimeSlider targetYear={targetYear} setTargetYear={setTargetYear} />
    </main>
  );
}

export default App;
