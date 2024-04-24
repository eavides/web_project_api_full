import cerrar from "../images/Close.png";
function PopupWithForm({ name, title, children, isOpen, onClose, onSubmit }) {
  return (
    <>
      <div
        className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
        id="popup"
      >
        <div className="popup__container">
          <div className="popup__button">
            <img
              alt="cerrar"
              className="popup__buttonClose"
              src={cerrar}
              onClick={onClose}
            />
          </div>

          <form
            className="form"
            name="register"
            id="form"
            onSubmit={onSubmit}
            noValidate
          >
            <h1 className="form__title">{title}</h1>
            {children}
            <button type="submit" id="save-submit" className="form__submit">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;
