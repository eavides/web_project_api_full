import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card({ card, onCardC, onCardLike, onCardDelete }) {
  const userContext = React.useContext(CurrentUserContext);
  // console.log(card);
  // console.log(userContext);
  let cardLikeButtonClassName = "";
  let cardDeleteButtonClassName = "";
  let isLiked = false;
  if (userContext) {
    const isOwn = card.owner === userContext._id;
    cardDeleteButtonClassName = `grid__card-delete ${
      isOwn ? "grid__card-delete_visible" : "grid__card-delete_hidden"
    }`;
    isLiked = card.likes.some((i) => i === userContext._id);

    cardLikeButtonClassName = ` ${
      isLiked ? "grid__card-like_active" : "grid__card-like"
    }`;
  } else {
    cardDeleteButtonClassName = "grid__card-delete grid__card-delete_hidden";
    const isLiked = false;

    cardLikeButtonClassName = ` ${
      isLiked ? "grid__card-like_active" : "grid__card-like"
    }`;
  }
  // const isOwn = card.owner === userContext._id;

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
