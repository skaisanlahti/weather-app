import React from "react";

function History(props) {
  if (props.history.length === 0) {
    return null;
  }
  return (
    <div className="history">
      <h2>History</h2>
      <ul>
        {props.history.map((location) => (
          <li
            className="location"
            key={location}
            onClick={props.handleHistoryClick}
          >
            {location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
