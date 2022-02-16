import React from "react";

const Points = ({ point }) => {
  return (
    <div className="current_points">
      <h3 className="title_current_points">Current results</h3>
      <p>{point} points</p>
    </div>
  );
};

export default Points;
