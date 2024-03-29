import React, { useEffect } from "react";

//Import Pages
import Dashboard from "./Dashboard";
import Loading from "./Loading";

//Import Configuration Setting
import locationMap from "../js/Location.json";

//Import Map
import imgFairWarm from "../img/cloud_icon/clear-day.svg";
import imgRaining from "../img/cloud_icon/rain.svg";
import imgPartlyCloudyDay from "../img/cloud_icon/partly-cloudy-day.svg";
import imgLightShower from "../img/cloud_icon/drizzle.svg";
import imgThunderyShower from "../img/cloud_icon/thunderstorms-rain.svg";
import imgPartyCloudyNight from "../img/cloud_icon/partly-cloudy-night.svg";
import imgCloudy from "../img/cloud_icon/overcast.svg";
import imgHeavyThunderyShower from "../img/cloud_icon/thunderstorms-rain.svg";
import imgClearday from "../img/cloud_icon/clear-day.svg";

const Function = (props) => {
  function selectBackgroundImage(forecast) {
    switch (forecast) {
      case "Fair & Warm":
        return imgFairWarm;
      case "Showers":
        return imgRaining;
      case "Partly Cloudy (Day)":
        return imgPartlyCloudyDay;

      case "Light Showers":
        return imgLightShower;
      case "Heavy Thundery Showers":
      //return imgHeavyThunderyShower;
      case "Thundery Showers":
        return imgHeavyThunderyShower;

      case "Cloudy":
        return imgCloudy;
      case "Partly Cloudy (Night)":
        return imgPartyCloudyNight;
      case "Fair (Day)":
        return imgClearday;
      default:
        return imgRaining;
    }
  }

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
        props.setItem(data.items[0]);
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
        props.setpsiReading(data.items[0].readings.psi_twenty_four_hourly);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const selectArea = (area) => {
    const tempResult = props.items.forecasts.find(
      (forecast) => forecast.area === area
    );

    props.weathers.weather = tempResult.forecast;
    props.weathers.area = tempResult.area;
    props.weathers.update = props.items.update_timestamp;
    props.weathers.psi = props.psiReading;
    const tempResult1 = locationMap.find((loca) => loca.area === area);
    props.weathers.region = tempResult1.region;
    //console.log(props.weathers);
    return tempResult;
  };

  useEffect(() => {
    const controller = new AbortController();
    getWeather(controller.signal);
    getPSI(controller.signal);
    return () => controller.abort();
  }, []);

  useEffect(() => {
    props.setLocations(locationMap);
    //console.log(props.locations);
  }, [props.locations, props.weathers, props.items]);

  const fetchData = () => {
    const controller = new AbortController();
    const { signal } = controller;
    getWeather(signal);
    getPSI(signal);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  /* Ensure item and items.forecasts is not null */
  return props.items && props.items.forecasts && props.psiReading ? (
    <Dashboard
      selectBackgroundImage={selectBackgroundImage}
      weather={props.items.forecasts}
      locations={props.locations}
      selectArea={selectArea}
      weathers={props.weathers}
      setWeather={props.setWeather}
      forecast={props.forecast}
      userName={props.userName}
    ></Dashboard>
  ) : (
    <div>
      <Loading />
    </div>
  );
};

export default Function;
