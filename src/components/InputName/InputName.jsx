import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import s from "./InputName.module.css";

const modalRootRef = document.querySelector("#modal-root");

const InputName = ({ closeForm, onInputName }) => {
  const [nameUser, setNameUser] = useState("");

  useEffect(() => {
    const onEscPress = (e) => {
      if (e.code === "Escape") {
        closeForm();
      }
    };

    window.addEventListener("keydown", onEscPress);

    return () => {
      window.removeEventListener("keydown", onEscPress);
    };
  }, [closeForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onInputName(nameUser);
    closeForm();
  };

  return createPortal(
    <div className={s.backdrop}>
      <div className={s.modal}>
        <header className={s.header}>
          <button className={s.closeBtn} onClick={closeForm} aria-label="Close">
            &times;
          </button>
        </header>
        <div className={s.content}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nameUser"
              value={nameUser}
              placeholder="Type your name"
              required
              minLength="3"
              maxLength="20"
              pattern="^[A-Za-zА-Яа-яЁё'`\s]+$"
              onChange={(e) => setNameUser(e.target.value)}
            />
            <button type="submit" className={s.button}>
              Enter
            </button>
          </form>
        </div>
      </div>
    </div>,
    modalRootRef
  );
};

export default InputName;
