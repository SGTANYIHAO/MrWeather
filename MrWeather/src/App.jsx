import React, { Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./components/Dashboard.css";

// Lazy loaded components
const Loading = React.lazy(() => import("./components/pages/Loading"));
const Function = React.lazy(() => import("./components/pages/Function"));

function App() {
  const [items, setItem] = useState([]);
  const [psiReading, setpsiReading] = useState([]);
  const [locations, setLocations] = useState([]);
  const [weathers, setWeather] = useState([]);

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/Dashboard" />} />
          <Route
            path="/Dashboard"
            element={
              <Function
                items={items}
                setItem={setItem}
                psiReading={psiReading}
                setpsiReading={setpsiReading}
                locations={locations}
                setLocations={setLocations}
                weathers={weathers}
                setWeather={setWeather}
              />
            }
          />
          {/* Add a route for /main or ensure it redirects correctly */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
