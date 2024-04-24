import React from "react";
import closeIcon from "../images/Close.png";

function ImagePopup({ title, link, isOpen, onClose }) {
  return (
    <div className={`imgdisplay ${isOpen}`}>
      <div className="imgdisplay__container">
        <div className="imgdisplay__container-card">
          <div className="imgdisplay__container-button">
            <img
              alt="closeIcon"
              className="imgdisplay__container-buttonimg"
              src={closeIcon}
              onClick={onClose}
            />
          </div>
          <img
            alt="Foto seleccionada"
            className="imgdisplay__image"
            src={link}
          />
          <h1 className="imgdisplay__title">{title}</h1>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
