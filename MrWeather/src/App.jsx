import React, { Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./components/Dashboard.css";
import NavBar from "./components/NavBar";

// Lazy loaded components help improve render
const Loading = React.lazy(() => import("./components/pages/Loading"));
const Function = React.lazy(() => import("./components/pages/Function"));
const Historical = React.lazy(() => import("./components/pages/Historical"));
const NotFound = React.lazy(() => import("./components/pages/NotFound"));

function App() {
  //Props Sharing State
  const [items, setItem] = useState([]);
  const [psiReading, setpsiReading] = useState([]);
  const [locations, setLocations] = useState([]);
  const [weathers, setWeather] = useState([]);

  //1.0 Lifting State requirement with Historical
  const [history, setHistory] = useState([]);
  const [userName, setUserName] = useState("");
  const handleUserChange = (newUser) => {
    setUserName(newUser);
  };

  const userGetRecord = async (user) => {
    console.log(user);
    const res = await fetch(
      `${
        import.meta.env.VITE_AIR_TABLE_SERVER
      }?filterByFormula=%7BUSER%7D%20%3D%20%27${user}%27`,
      {
        method: "GET",
        headers: {
          Authorization: import.meta.env.VITE_AIR_TABLE_TOKEN,
        },
      }
    );
    if (res.ok) {
      console.log("Successfully Return Value");
      const data = await res.json();
      setHistory(data.records);
    }
  };

  const useDeleteRecord = async (history) => {
    for (const record of history) {
      const res = await fetch(
        `${import.meta.env.VITE_AIR_TABLE_SERVER}/${record.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${import.meta.env.VITE_AIR_TABLE_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        console.log(`Successfully Deleted ${record.id}`);
        setHistory((currentHistory) =>
          currentHistory.filter((item) => item.id !== record.id)
        );
      } else {
        console.error(`Failed to delete ${record.id}`);
      }
    }
  };

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
              <Historical
                history={history}
                userName={userName}
                userGetRecord={userGetRecord}
                useDeleteRecord={useDeleteRecord}
                handleUserChange={handleUserChange}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
