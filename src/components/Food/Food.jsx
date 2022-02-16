import React from "react";
import { GrApple } from "react-icons/gr";
import { GiPear } from "react-icons/gi";
import { GiGrapes } from "react-icons/gi";

const Food = ({ food, typesOfFeed }) => {
  const style = {
    left: `${food[0]}%`,
    top: `${food[1]}%`,
  };
  return (
    <>
      {typesOfFeed === 1 && (
        <div className="snake_food" style={style}>
          <GrApple />
        </div>
      )}
      {typesOfFeed === 5 && (
        <div className="snake_food pear" style={style}>
          <GiPear />
        </div>
      )}
      {typesOfFeed === 10 && (
        <div className="snake_food grapes" style={style}>
          <GiGrapes />
        </div>
      )}
    </>
  );
};

export default Food;
