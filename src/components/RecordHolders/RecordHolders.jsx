import React from "react";

const RecordHolders = ({ users }) => {
  return (
    <div className="recordholders">
      <h3>RecordHolders</h3>
      <ul>
        {users.map(({ name, score, id }) => (
          <li key={id}>
            <p>
              {name} : {score} points
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordHolders;
