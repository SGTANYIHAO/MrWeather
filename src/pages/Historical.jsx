import React, { useEffect } from "react";
import "./Historical.modules.css";

const Historical = ({
  history,
  userName,
  handleUserChange,
  userGetRecord,
  useDeleteRecord,
}) => {
  useEffect(
    () => {
      userGetRecord(userName);
    },
    [userName],
    [history]
  );

  return (
    <div className="gridContainer">
      <h2>Your Recent View</h2>
      <label>Enter Your Name</label>
      <input
        type="text"
        value={userName}
        onChange={(e) => handleUserChange(e.target.value)}
      />
      <button
        className="btnEnterSearch"
        onClick={() => {
          userGetRecord(userName);
        }}
      >
        Enter Search
      </button>
      {/* Assuming deleteUser is defined elsewhere */}
      <button
        className="btnDeleteHistory"
        onClick={() => {
          useDeleteRecord(history);
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
