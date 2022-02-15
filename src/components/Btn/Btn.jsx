import React from "react";

const Btn = ({ onLeft, onUp, onRight, onDown, movie }) => {
  return (
    <div>
      <button type="button" className="btn" onClick={onLeft}>
        Left
      </button>
      <button type="button" className="btn" onClick={onUp}>
        Up
      </button>
      <button type="button" className="btn" onClick={onRight}>
        Right
      </button>
      <button type="button" className="btn" onClick={onDown}>
        Down
      </button>
      <button type="button" className="btn" onClick={movie}>
        Start
      </button>
    </div>
  );
};

export default Btn;
