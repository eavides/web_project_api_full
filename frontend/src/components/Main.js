import edit from "../images/Edit.svg";
import add from "../images/AddButton.svg";
import imgEdit from "../images/iconed.png";
import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CardContext from "../contexts/CardContext";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const userContext = React.useContext(CurrentUserContext);
  const cardContext = React.useContext(CardContext);

  return (
    <main className="container">
      <section className="profile">
        <div className="profile__content">
          <img
            alt="Imagen de perfil"
            className="profile__image"
            src={userContext.avatar}
          />
          <img
            alt="Icono editar"
            className="profile__imageEdit"
            src={imgEdit}
            onClick={onEditAvatarClick}
          />
        </div>

        <div className="profile__information">
          <div id="infoGroup">
            <h1 className="profile__name">{userContext.name}</h1>
            <h2 className="profile__position">{userContext.about}</h2>
          </div>
        </div>
        <div className="profile__buttonEdit">
          <div className="profile__button">
            <img
              alt="Boton perfil"
              className="profile__edit"
              src={edit}
              onClick={onEditProfileClick}
            />
          </div>
        </div>

        <div className="profile__add">
          <img
            alt="Boton agregar"
            className="profile__addImage"
            src={add}
            onClick={onAddPlaceClick}
          />
        </div>
      </section>
      <section className="grid">
        <div className="grid__container">
          {cardContext.map((item) => {
            return (
              <Card
                key={item._id}
                card={item}
                onCardC={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              ></Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
