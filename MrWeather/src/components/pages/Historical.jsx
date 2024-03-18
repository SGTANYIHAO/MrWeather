import React, { useState, useEffect } from "react";
import "./Historical.modules.css";
// Assuming userGetRecord is correctly imported or defined elsewhere if needed

const Historical = (props) => {
  const [history, setHistory] = useState([]);
  const [inputUserName, setInputUserName] = useState("");
  const [totalLength, setTotalLength] = useState();

  useEffect(
    () => {
      // Assuming you want to call userGetRecord with the updated userName prop
      // This effect will re-run whenever props.userName changes
      if (props.userName) {
        userGetRecord(props.userName);
      }
      /*       if (history.length === totalLength) {
        console.log(history[0].id);
      } */
    },
    [props.userName],
    [history]
  );

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

      setTotalLength(data.records.length);
      setHistory(data.records); // Directly store the records for simplicity
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
    <div className="gridContainer">
      <h2>Your Recent View</h2>
      <label>Enter Your Name</label>
      <input
        type="text"
        value={inputUserName} // Use value instead of inputValue
        onChange={(e) => setInputUserName(e.target.value)}
      />
      <button
        className="btnEnterSearch"
        onClick={() => {
          props.setUserName(inputUserName);
          if (inputUserName) {
            userGetRecord(inputUserName);
          } // Call with inputUserName
        }}
      >
        Enter Search
      </button>
      {/* Assuming deleteUser is defined elsewhere */}
      <button
        className="btnDeleteHistory"
        onClick={() => {
          if (history.length > 0) {
            useDeleteRecord(history);
          }
        }}
      >
        Delete History
      </button>
      <div className="displayHistory" style={{ overflowY: "scroll" }}>
        <div className="row header">
          <div className="col-md-2 header">AREA</div>
          <div className="col-md-2 header">WEATHER</div>
          <div className="col-md-1 header">REGION</div>
          <div className="col-md-1 header">PSI</div>
          <div className="col-md-3 header">UPDATE</div>
          <div className="col-md-3 header">TIMESTAMP</div>
        </div>
        {history.map((record, index) => (
          <div className="row field" key={index}>
            <div className="col-md-2 field">{record.fields.AREA}</div>
            <div className="col-md-2 field">{record.fields.WEATHER}</div>
            <div className="col-md-1 field">{record.fields.REGION}</div>
            <div className="col-md-1 field">{record.fields.PSI}</div>
            <div className="col-md-3 field">{record.fields.UPDATE}</div>
            <div className="col-md-3 field">{record.fields.TIMESTAMP}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Historical;
