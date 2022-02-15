import { useState, useEffect } from "react";
import s from "./App.module.css";
import Snake from "../Snake/Snake";
import Food from "../Food/Food";
import Btn from "../Btn/Btn";

const getRandomCoord = () => {
  let min = 1;
  let max = 98;

  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const App = () => {
  const [snakeDots, setsSakeDots] = useState([
    [0, 0],
    [2, 0],
  ]);
  const [food, setFood] = useState(getRandomCoord());
  const [direction, setDirection] = useState("DOWN");

  // setInterval(setDirection("RIGHT"), 500);

  const movie = () => {
    moveSnake();
  };

  const onLeft = () => {
    setDirection("LEFT");
    moveSnake();
  };

  const onUp = () => {
    setDirection("UP");
    moveSnake();
  };
  const onRight = () => {
    setDirection("RIGHT");
    moveSnake();
  };
  const onDown = () => {
    setDirection("DOWN");
    moveSnake();
  };

  const moveSnake = () => {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction) {
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;

      default:
        break;
    }
    dots.push(head);
    dots.splice(0, 1);

    setsSakeDots(dots);
  };
  console.log(`snakeDots`, snakeDots);

  useEffect(() => {
    setInterval(onRight(), 1000);
  }, []);

  // useEffect(() => {
  //   setInterval(moveSnake, 500);
  // }, [moveSnake]);

  // const checkBorder = () => {

  //   if(){}
  // }

  return (
    <div className={s.game_area}>
      <Snake snakeDots={snakeDots} />
      <Food food={food} />
      <Btn
        onLeft={onLeft}
        onUp={onUp}
        onRight={onRight}
        onDown={onDown}
        movie={movie}
      />
    </div>
  );
};

export default App;
