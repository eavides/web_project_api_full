import React from "react";
import closeIcon from "../images/Close.png";
import checkIcon from "../images/check.png";
import icoEerror from "../images/error.png";

function InfoTooltip({
  isOpen,
  setIsRegistered,
  setIsWrong,
  isWrong,
  exitWin,
  closeWin,
  reg,
}) {
  function onClose(evt) {
    evt.preventDefault();
    if (isOpen === true) {
      setIsRegistered(false);
    }
    if (isWrong === true) {
      if (reg) {
        closeWin(false);
      } else {
        exitWin(false);
      }
    }
  }
  return (
    <div
      className={`regconf ${isOpen ? "regconf_opened" : ""} ${
        isWrong ? "regconf_opened" : ""
      }`}
    >
      <div className="regconf_container">
        <div className="regconf__container-button">
          <img
            alt="closeIcon"
            className="imgdisplay__container-buttonimg"
            src={closeIcon}
            onClick={onClose}
          />
        </div>
        <div className="regconf__check">
          <img
            alt="Check"
            className="regconf__img-check"
            src={isWrong ? icoEerror : isOpen ? checkIcon : ""}
          />
        </div>
        <h2 className="regconf__title">
          {isWrong
            ? "Uy, algo salió mal. Por favor, inténtalo de nuevo."
            : isOpen
            ? "¡Correcto! Ya estás registrado."
            : ""}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
