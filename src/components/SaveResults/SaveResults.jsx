import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import s from "./SaveResults.module.css";

const modalRootRef = document.querySelector("#modal-root");

const SaveResults = ({ closeForm, handleYes, handleNo }) => {
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

  return createPortal(
    <div className={s.backdrop}>
      <div className={s.modal}>
        <header className={s.header}>
          <button className={s.closeBtn} onClick={closeForm} aria-label="Close">
            &times;
          </button>
        </header>
        <div className={s.content}>
          <p>Do you want to save?</p>
          <button type="button" className={s.button} onClick={handleYes}>
            Yes
          </button>
          <button type="button" className={s.button} onClick={handleNo}>
            No
          </button>
        </div>
      </div>
    </div>,
    modalRootRef
  );
};

export default SaveResults;
