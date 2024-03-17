import React, { useState } from "react";
import Function from "./components/Function";

import "./components/Dashboard.css";

function App() {
  const [items, setItem] = useState([]);
  const [psiReading, setpsiReading] = useState([]);
  const [locations, setLocations] = useState([]);
  const [weathers, setWeather] = useState([]);

  return (
    <div>
      <Function
        items={items}
        setItem={setItem}
        psiReading={psiReading}
        setpsiReading={setpsiReading}
        locations={locations}
        setLocations={setLocations}
        weathers={weathers}
        setWeather={setWeather}
      ></Function>
    </div>
  );
}

export default App;
