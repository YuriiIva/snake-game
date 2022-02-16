import React from "react";

const Welcome = ({ newNameUser }) => {
  return (
    <div className="welcome">
      <h1> Welcome {newNameUser}</h1>
    </div>
  );
};

export default Welcome;
