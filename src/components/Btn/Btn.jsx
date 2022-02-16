import React from "react";
import s from "./Btn.module.css";

const Btn = ({ onLeft, onUp, onRight, onDown, onStart, isStart, onPause }) => {
  return (
    <div className={s.btn_list}>
      <button
        type="button"
        className={`${s.btn} ${s.btn_left}`}
        onClick={onLeft}
      >
        Left
      </button>
      <button type="button" className={`${s.btn} ${s.btn_up} `} onClick={onUp}>
        Up
      </button>
      <button
        type="button"
        className={`${s.btn} ${s.btn_right} `}
        onClick={onRight}
      >
        Right
      </button>
      <button
        type="button"
        className={`${s.btn} ${s.btn_down} `}
        onClick={onDown}
      >
        Down
      </button>
      {!isStart && (
        <button
          type="button"
          className={`${s.btn} ${s.btn_start} `}
          onClick={onStart}
        >
          Start
        </button>
      )}
      <button
        type="button"
        className={`${s.btn} ${s.btn_pause} `}
        onClick={onPause}
      >
        Pause
      </button>
    </div>
  );
};

export default Btn;
