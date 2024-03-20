import React from "react";

const userInsert = () => {
  const userInsert = async (
    user,
    area,
    psi,
    region,
    weather,
    update,
    timestamp
  ) => {
    const res = await fetch(import.meta.env.VITE_AIR_TABLE_SERVER, {
      method: "POST",
      headers: {
        Authorization: import.meta.env.VITE_AIR_TABLE_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          USER: user,
          AREA: area,
          PSI: psi.toString(),
          REGION: region,
          WEATHER: weather,
          UPDATE: update,
          TIMESTAMP: timestamp,
        },
      }),
    });
    if (res.ok) {
      console.log("Successfully Insert To AirTable");
    }
  };
  return userInsert;
};

export default userInsert;
