import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardsName, setCardsName] = useState("");
  const [cardsImageLink, setCardsImageLink] = useState("");
  const [isCardsNameValid, setIsCardsNameValid] = useState(true);
  const [isCardsImageLinkValid, setIsCardsImageLinkValid] = useState(true);
  const [cardsNameErrorMessage, setCardsNameErrorMessage] = useState("");
  const [cardsImageLinkErrorMessage, setCardsImageLinkErrorMessage] =
    useState("");

  useEffect(() => {
    setCardsName("");
    setCardsImageLink("");
    setIsCardsNameValid(true);
    setIsCardsImageLinkValid(true);
    setCardsNameErrorMessage("");
    setCardsImageLinkErrorMessage("");
  }, [isOpen]);
  const handleTitleChange = (evt) => {
    const { value, validity, validationMessage } = evt.target;
    setCardsName(value);
    setIsCardsNameValid(validity.valid);
    if (!validity.valid) {
      setCardsNameErrorMessage(validationMessage);
    } else {
      setCardsNameErrorMessage("");
    }
  };

  const handleImageLinkChange = (evt) => {
    const { value, validity, validationMessage } = evt.target;
    setCardsImageLink(value);
    setIsCardsImageLinkValid(validity.valid);
    if (!validity.valid) {
      setCardsImageLinkErrorMessage(validationMessage);
    } else {
      setCardsImageLinkErrorMessage("");
    }
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name: cardsName, link: cardsImageLink });
  }

  return (
    <PopupWithForm
      name="newcard"
      title="Nuevo Lugar"
      isOpen={isOpen ? "newcard_opened" : ""}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="title-input"
        name="name"
        onChange={handleTitleChange}
        value={cardsName}
        className="form__input form__format"
        placeholder="Titulo"
        minLength="2"
        maxLength="30"
        required
      />
      <span
        className={`form__input-error ${
          !isCardsNameValid && `form__input-error_active`
        }`}
        id="input-title-error"
      >
        {cardsNameErrorMessage}
      </span>
      <input
        type="url"
        id="url-input"
        name="link"
        onChange={handleImageLinkChange}
        value={cardsImageLink}
        className="form__input form__format"
        placeholder="Enlace de la Imagen"
        required
      />
      <span
        className={`form__input-error ${
          !isCardsImageLinkValid && `form__input-error_active`
        }`}
        id="input-url-error"
      >
        {cardsImageLinkErrorMessage}
      </span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
