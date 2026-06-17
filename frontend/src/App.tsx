import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map", // container id
      style: "https://demotiles.maplibre.org/globe.json", // style URL
      center: [0, 0], // starting position [lng, lat]
      zoom: 3, // starting zoom
    });
  }, []);

  return (
    <main>
      <div id='map' className='map'></div>
    </main>
  );
}

export default App;
