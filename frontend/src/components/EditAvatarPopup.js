import React, { useEffect, useState, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [isAvatarLinkValid, setIsAvatarLinkValid] = useState(true);
  const [avatarLinkErrorMessage, setAvatarLinkErrorMessage] = useState("");
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
    setIsAvatarLinkValid(true);
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function handleValidity(evt) {
    setIsAvatarLinkValid(evt.target.validity.valid);
    setAvatarLinkErrorMessage(avatarRef.current.validationMessage);
  }
  return (
    <PopupWithForm
      name="editimage"
      title="Cambiar foto de perfil"
      isOpen={isOpen ? "editimage_opened" : ""}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="img-input"
        name="link"
        ref={avatarRef}
        onChange={handleValidity}
        className="form__input form__format"
        placeholder="Enlace de la Imagen"
        required
      />
      <span
        className={`form__input-error ${
          !isAvatarLinkValid && `form__input-error_active`
        }`}
        id="input-error"
      >
        {avatarLinkErrorMessage}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
