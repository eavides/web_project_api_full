import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isNameValids, setIsNameValids] = useState(true);
  const [isDescriptionValids, setIsDescriptionValids] = useState(true);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");

  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
    setIsNameValids(true);
    setIsDescriptionValids(true);
    setNameErrorMessage("");
    setDescriptionErrorMessage("");
  }, [currentUser]);

  const handleUserName = (evt) => {
    const { value, validity, validationMessage } = evt.target;
    setName(value);
    setIsNameValids(validity.valid);

    if (!validity.valid) {
      setNameErrorMessage(validationMessage);
    } else {
      setNameErrorMessage("");
    }
  };

  const handleUserPosition = (evt) => {
    const { value, validity, validationMessage } = evt.target;
    setDescription(value);
    setIsDescriptionValids(validity.valid);
    if (!validity.valid) {
      setDescriptionErrorMessage(validationMessage);
    } else {
      setDescriptionErrorMessage("");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Editar Perfil"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="name-input"
        name="name"
        value={name}
        onChange={handleUserName}
        className="form__input form__format"
        placeholder="Nombre"
        minLength="2"
        maxLength="40"
        required
      />
      <span
        className={`form__input-error ${
          !isNameValids && `form__input-error_active`
        }`}
        id="input-name-error"
      >
        {nameErrorMessage}
      </span>

      <input
        type="text"
        id="position-input"
        name="about"
        value={description}
        onChange={handleUserPosition}
        className="form__input form__format"
        placeholder="Profesion"
        minLength="2"
        maxLength="200"
        required
      />
      <span
        className={`form__input-error ${
          !isDescriptionValids && `form__input-error_active`
        }`}
        id="input-about-error"
      >
        {descriptionErrorMessage}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
