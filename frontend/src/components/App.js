import ImagePopup from "./ImagePopup.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React, { useEffect } from "react";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import CardContext from "../contexts/CardContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { Route, Switch } from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImageOpen, setIsImageOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isWrong, setIsWrong] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [token, setToken] = React.useState(false);

  useEffect(() => {
    api.getCards().then((res) => {
      setCards(res);
    });
  }, []);

  useEffect(() => {
    api.getUserInfo().then((res) => {
      setCurrentUser(res);
    });
  }, []);

  useEffect(() => {
    const login = localStorage.getItem("token");
    if (login) {
      console.log("entro aca");
      auth.getContent(login).then((res) => {
        setEmail(res.data.email);
        setToken(true);
      });
    }
  }, []);

  useEffect(() => {
    function handleOverlayClose(evt) {
      if (evt.target.classList.contains("popup_opened")) {
        closeAllPopups();
      }
      if (evt.target.classList.contains("imgdisplay_opened")) {
        closeAllPopups();
      }
    }

    function handleEscapeClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    if ([isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen]) {
      document.addEventListener("mousedown", handleOverlayClose);
      document.addEventListener("keydown", handleEscapeClose);
    }

    return () => {
      document.removeEventListener("mousedown", handleOverlayClose);
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }
  function handleCardDelete(card) {
    api
      .deleteCard({}, card._id)
      .then(() => {
        const newCards = cards.filter(
          (currentCard) => currentCard._id !== card._id
        );
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImageOpen(false);
  }

  function handleCardClick(card) {
    setIsImageOpen(true);
    setSelectedCard(card);
  }

  function handleUpdateUser(userData) {
    api
      .editProfileInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(dataAvatar) {
    api
      .updateImg(dataAvatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(cardData) {
    api
      .addCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleLogin(state) {
    if (state === true) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }
  function handleWrong(wrong) {
    if (wrong === true) {
      setIsWrong(true);
    } else {
      setIsWrong(false);
    }
  }

  function handleRegister(state) {
    setIsRegistered(state);
  }

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/login">
            <Header />
            <Login
              isRegistered={isRegistered}
              setIsRegistered={setIsRegistered}
              setIsLoggedIn={handleLogin}
              setIsFail={handleWrong}
              setIsWrong={setIsRegistered}
              isWrong={isWrong}
              token={token}
            />
          </Route>
          <Route path="/register">
            <Header />
            <Register
              handleRegister={handleRegister}
              isRegistered={isRegistered}
              setIsRegistered={setIsRegistered}
              setIsLoggedIn={handleLogin}
              setIsFail={handleWrong}
              setIsWrong={setIsRegistered}
              isWrong={isWrong}
            />
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={isAuthenticated}
            token={token}
            setEmail={setEmail}
          >
            <div className="page">
              <CardContext.Provider value={cards}>
                {/* <CurrentUserContext.Provider value={currentUser}> */}
                <Header email={email} />
                <Main
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />

                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />

                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                />

                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlaceSubmit}
                />

                <ImagePopup
                  link={selectedCard.link}
                  title={selectedCard.name}
                  isOpen={isImageOpen ? "imgdisplay_opened" : ""}
                  onClose={closeAllPopups}
                ></ImagePopup>
                {/* </CurrentUserContext.Provider> */}
              </CardContext.Provider>
            </div>
          </ProtectedRoute>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
