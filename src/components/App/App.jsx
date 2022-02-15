import { useState, useEffect } from "react";
import s from "./App.module.css";
import Snake from "../Snake/Snake";
import Food from "../Food/Food";
import Btn from "../Btn/Btn";

const getRandomCoord = () => {
  let min = 1;
  let max = 98;

  let x = Math.floor((Math.random() * (max - min + 1) + min) / 4) * 4;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 4) * 4;
  return [x, y];
};

const initialState = [
  [0, 0],
  [4, 0],
];

const App = () => {
  const [snakeDots, setsSakeDots] = useState(initialState);
  const [food, setFood] = useState(getRandomCoord());
  const [direction, setDirection] = useState("RIGHT");
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    if (isStart === true) {
      const id = setInterval(() => {
        moveSnake();
      }, 500);

      return () => {
        clearInterval(id);
      };
    }
  }, [snakeDots]);

  const onStart = () => {
    setIsStart(true);
    moveSnake();
  };

  const onLeft = () => {
    setDirection("LEFT");
  };

  const onUp = () => {
    setDirection("UP");
  };
  const onRight = () => {
    setDirection("RIGHT");
  };
  const onDown = () => {
    setDirection("DOWN");
  };

  const moveSnake = () => {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction) {
      case "LEFT":
        head = [head[0] - 4, head[1]];
        break;
      case "RIGHT":
        head = [head[0] + 4, head[1]];
        break;
      case "UP":
        head = [head[0], head[1] - 4];
        break;
      case "DOWN":
        head = [head[0], head[1] + 4];
        break;

      default:
        break;
    }
    dots.push(head);
    dots.splice(0, 1);

    setsSakeDots(dots);
  };

  const checkBorder = () => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[0] < 0 || head[1] >= 100 || head[1] < 0) {
      gameOver();
    }
    return;
  };

  const onEatFood = () => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood(getRandomCoord());
      enlargerSnake();
    }
  };

  const enlargerSnake = () => {
    let newSnake = [...snakeDots];
    newSnake.unshift([]);
    setsSakeDots(newSnake);
  };

  // const onHittingSomeself = () => {
  //   let snake = [...snakeDots];
  //   let head = snake[snake.length - 1];

  //   snake.forEach((dot) => {
  //     if (head[0] === dot[0] && head[1] === dot[1]) {
  //       gameOver();
  //     }
  //   });
  // };

  const gameOver = () => {
    alert("Game over");
    setsSakeDots(initialState);
    setDirection("RIGHT");
    setIsStart(false);
  };

  useEffect(() => {
    checkBorder();
  }, [checkBorder]);

  useEffect(() => {
    onEatFood();
  }, [onEatFood]);

  // useEffect(() => {
  //   onHittingSomeself();
  // }, [onHittingSomeself]);

  return (
    <div className={s.game_area}>
      <Snake snakeDots={snakeDots} />
      <Food food={food} />
      <Btn
        onLeft={onLeft}
        onUp={onUp}
        onRight={onRight}
        onDown={onDown}
        onStart={onStart}
      />
    </div>
  );
};

export default App;
