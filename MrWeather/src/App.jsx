import React, { Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./components/Dashboard.css";
import NavBar from "./components/NavBar";
// Lazy loaded components
const Loading = React.lazy(() => import("./components/pages/Loading"));
const Function = React.lazy(() => import("./components/pages/Function"));
const Historical = React.lazy(() => import("./components/pages/Historical"));
const Display = React.lazy(() => import("./components/Display"));

function App() {
  const [items, setItem] = useState([]);
  const [psiReading, setpsiReading] = useState([]);
  const [locations, setLocations] = useState([]);
  const [weathers, setWeather] = useState([]);
  const [userName, setUserName] = useState("");

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <NavBar userName={userName}></NavBar>
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
                userName={userName}
              />
            }
          />
          <Route
            path="/Historical"
            element={
              <Historical setUserName={setUserName} userName={userName} />
            }
          />

          {/* Add a route for /main or ensure it redirects correctly */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
