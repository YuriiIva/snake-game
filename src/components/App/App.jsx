import { useState, useEffect } from "react";
import s from "./App.module.css";
import Snake from "../Snake/Snake";
import Food from "../Food/Food";
import Btn from "../Btn/Btn";
import Welcome from "../Welcome/Welcome";
import InputName from "../InputName/InputName";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nanoid } from "nanoid";

import Points from "../Points/Points";
import { getData, saveItem, deleteItem } from "../../services/Api";
import RecordHolders from "../RecordHolders/RecordHolders";
import SaveResults from "../SaveResults/SaveResults";

<ToastContainer
  position="top-center"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>;

const API_ENDPOINT = "users";

const getRandomCoord = () => {
  let min = 1;
  let max = 98;

  let x = Math.floor((Math.random() * (max - min + 1) + min) / 4) * 4;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 4) * 4;
  return [x, y];
};

const getRandomFood = () => {
  let min = 1;
  let max = 30;
  let apple = 1;
  let pear = 5;
  let grapes = 10;
  let randomNumber = Math.random() * (max - min) + min;

  if (randomNumber < 10) {
    return apple;
  }
  if (randomNumber >= 10 && randomNumber < 20) {
    return pear;
  }
  if (randomNumber >= 20) {
    return grapes;
  }
};

const initialState = [
  [0, 0],
  [4, 0],
];

let STARTING_SPEED = 300;

const App = () => {
  const [snakeDots, setsSakeDots] = useState(initialState);
  const [food, setFood] = useState(getRandomCoord());
  const [direction, setDirection] = useState("RIGHT");
  const [isStart, setIsStart] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [newNameUser, setNewNameUser] = useState("");
  const [point, setPoint] = useState(0);
  const [users, setUsers] = useState([]);
  const [onSave, setOnSave] = useState(false);
  const [newUser, setNewUser] = useState("");
  const [typesOfFeed, setTypesOfFeed] = useState(getRandomFood());
  const [speed, setSpeed] = useState(STARTING_SPEED);

  useEffect(() => {
    const getUser = async () => {
      const users = await getData(API_ENDPOINT);
      setUsers([...users]);
    };
    getUser();
  }, []);

  useEffect(() => {
    let i = Math.floor(point / 50);
    if (i > 0) {
      setSpeed(STARTING_SPEED - 10 * i);
    }
  }, [point]);

  useEffect(() => {
    if (newUser) {
      const saveNewUser = async () => {
        const newUsers = await saveItem(API_ENDPOINT, newUser);
      };
      saveNewUser();
    }
  }, [newUser]);

  useEffect(() => {
    if (isStart === true) {
      const id = setInterval(() => {
        moveSnake();
      }, speed);

      return () => {
        clearInterval(id);
      };
    }
  }, [snakeDots]);

  const onStart = () => {
    setIsStart(true);
    moveSnake();
    setPoint(0);
    setOnSave(false);
    setNewUser("");
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

  const closeForm = () => {
    setIsFormOpen(false);
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
      setTypesOfFeed(getRandomFood());
      setPoint((prev) => {
        if (typesOfFeed === 1) {
          return prev + 1;
        }
        if (typesOfFeed === 5) {
          return prev + 5;
        }
        if (typesOfFeed === 10) {
          return prev + 10;
        }
      });
      enlargerSnake();
    }
  };

  const enlargerSnake = () => {
    let newSnake = [...snakeDots];
    newSnake.unshift([]);
    setsSakeDots(newSnake);
  };

  const onEatingSomeself = () => {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    let tail = snake.filter((dot) => dot !== head);

    tail.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        gameOver();
      }
    });
  };

  const gameOver = () => {
    toast.error("GameOver");
    setsSakeDots(initialState);
    setDirection("RIGHT");
    setIsStart(false);
    setOnSave(true);
  };

  useEffect(() => {
    checkBorder();
  }, [checkBorder]);

  useEffect(() => {
    onEatFood();
  }, [onEatFood]);

  useEffect(() => {
    onEatingSomeself();
  }, [onEatingSomeself]);

  const onInputName = (nameUser) => {
    setNewNameUser(nameUser);
  };

  const onPause = () => {
    setIsStart((prev) => !prev);
    moveSnake();
  };

  const handleYes = () => {
    setNewUser({ name: newNameUser, score: point, id: nanoid(4) });
    closeSaveForm();
  };

  const closeSaveForm = () => {
    setOnSave(false);
  };

  return (
    <div>
      {isFormOpen && (
        <InputName closeForm={closeForm} onInputName={onInputName} />
      )}
      {onSave && (
        <SaveResults
          closeForm={closeSaveForm}
          handleYes={handleYes}
          handleNo={closeSaveForm}
        />
      )}
      <Welcome newNameUser={newNameUser} />
      <div className={s.points}>
        <div>
          <Points point={point} />
          <RecordHolders users={users} />
        </div>

        <div className={s.game_area}>
          <Snake snakeDots={snakeDots} />
          <Food food={food} typesOfFeed={typesOfFeed} />
          <Btn
            onLeft={onLeft}
            onUp={onUp}
            onRight={onRight}
            onDown={onDown}
            onStart={onStart}
            isStart={isStart}
            onPause={onPause}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
