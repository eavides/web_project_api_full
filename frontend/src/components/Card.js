import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card({ card, onCardC, onCardLike, onCardDelete }) {
  const userContext = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === userContext._id;
  const cardDeleteButtonClassName = `grid__card-delete ${
    isOwn ? "grid__card-delete_visible" : "grid__card-delete_hidden"
  }`;
  const isLiked = card.likes.some((i) => i._id === userContext._id);
  const cardLikeButtonClassName = ` ${
    isLiked ? "grid__card-like_active" : "grid__card-like"
  }`;
  function handleClick() {
    return onCardC(card);
  }
  function handleLikeClick() {
    return onCardLike(card);
  }
  function handleDeleteClick() {
    return onCardDelete(card);
  }
  return (
    <>
      <div className="grid__card">
        <button
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
        ></button>
        <img
          className="grid__card-image"
          src={card.link}
          alt="Imagen de carta"
          onClick={handleClick}
        />
        <div className="grid__card-description">
          <p className="grid__card-title">{card.name}</p>
          <div className="grid__card-group">
            <button
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}
            ></button>
            <p className="grid__card-count">{card.likes.length || 0}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
