import React from "react";

const RecordHolders = ({ users }) => {
  return (
    <div className="record_holders">
      <h3 className="record_holders_title">Record Holders</h3>
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
