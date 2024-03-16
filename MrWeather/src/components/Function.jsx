import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import locationMap from "../js/Location.json";
// Require 3 more component.
// Router into Error Page.
// Project Folder issues
// Comit
// Update the story Board.
const Function = () => {
  const [items, setItem] = useState([]);
  const [psiReading, setpsiReading] = useState([]);
  const [locations, setLocations] = useState([]);
  const [weathers, setWeather] = useState({
    update: "",
    area: "",
    weather: "",
    psi: {},
    region: "",
  });

  // This function is hypothetical and assumes you call it right after fetching your data
  const getWeather = async (signal) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/environment/2-hour-weather-forecast",
        {
          signal,
        }
      );

      if (res.ok) {
        const data = await res.json();
        setItem(data.items[0]);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const getPSI = async (signal) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/environment/psi",
        {
          signal,
        }
      );

      if (res.ok) {
        const data = await res.json();
        setpsiReading(data.items[0].readings.psi_twenty_four_hourly);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const selectArea = (area) => {
    const tempResult = items.forecasts.find(
      (forecast) => forecast.area === area
    );
    //console.log(items.update_timestamp);
    weathers.weather = tempResult.forecast;
    weathers.area = tempResult.area;
    weathers.update = items.update_timestamp;
    weathers.psi = psiReading;
    console.log(weathers);
    return tempResult;
  };

  useEffect(() => {
    const controller = new AbortController();
    getWeather(controller.signal);
    getPSI(controller.signal);
    return () => controller.abort();
  }, []);

  useEffect(() => {
    console.log(items.forecasts);
  }, [items]);

  useEffect(() => {
    console.log(psiReading);
  }, [psiReading]);

  useEffect(() => {
    setLocations(locationMap);
    console.log(locations);
  }, []);

  /* Ensure item and items.forecasts is not null */
  return items && items.forecasts && psiReading ? (
    <Dashboard
      weather={items.forecasts}
      locations={locations}
      selectArea={selectArea}
      weathers={weathers}
      setWeather={setWeather}
    ></Dashboard>
  ) : (
    <div>Loading...</div>
  );
};

export default Function;
