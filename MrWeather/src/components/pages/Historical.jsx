import React, { useState } from "react";
import "./Historical.modules.css";

const Historical = (props) => {
  const [history, setHistory] = useState({});
  const [isVisible, setIsVisible] = useState(true);
  const [inputUserName, setInputUserName] = useState("");
  const addToHistory = (view) => {
    if (history[props.userName]) {
      const userHistory = [...history[props.userName], view];
      setHistory({ ...history, [props.userName]: userHistory });
    }
  };

  const deleteUser = () => {
    const newHistory = { ...history };
    delete newHistory[props.userName];
    setHistory(newHistory);
    props.setUserName("");
  };

  return (
    <div className="gridContainer">
      <h2>Your Recent View</h2>
      <label>Enter Your Name</label>
      <input
        type="text"
        inputValue={props.userName}
        onChange={(e) => setInputUserName(e.target.value)}
      />
      <button
        className="btnEnterSearch"
        onClick={() => props.setUserName(inputUserName)}
      >
        Enter Search
      </button>
      <button className="btnDeleteHistory" onClick={deleteUser}>
        Delete History
      </button>
      <div
        className="displayHistory"
        style={{ overflowY: "scroll", height: "200px" }}
      >
        {history[props.userName] &&
          history[props.userName].map((view, index) => (
            <div key={index}>{view}</div>
          ))}
      </div>
    </div>
  );
};

export default Historical;
