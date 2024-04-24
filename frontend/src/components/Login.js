import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip.js";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closewin = this.closewin.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      return;
    }

    const { email, password } = this.state;
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          this.setState(
            {
              email: "",
              password: "",
            },
            () => {
              this.props.setIsLoggedIn(true);

              this.props.history.push("/");
            }
          );
        }
      })
      .catch((err) => {
        this.props.setIsLoggedIn(true);
        this.props.setIsFail(true);
      });
  }

  closewin(state) {
    this.props.setIsLoggedIn(state);
    this.props.setIsFail(state);
  }

  render() {
    return (
      <>
        <InfoTooltip
          isOpen={this.props.isRegistered}
          setIsRegistered={this.props.setIsRegistered}
          setIsWrong={this.props.setIsWrong}
          isWrong={this.props.isWrong}
          exitWin={this.closewin}
        ></InfoTooltip>
        <div className="login">
          <h3 className="login__title">Inicia Sesión</h3>
          <form
            onSubmit={this.handleSubmit}
            className="login__form form__format"
          >
            <input
              id="email"
              className="login__format"
              required
              name="email"
              type="email"
              value={this.state.username}
              placeholder="Correo Electronico"
              onChange={this.handleChange}
            />
            <input
              id="password"
              className="login__format"
              required
              name="password"
              type="password"
              value={this.state.password}
              placeholder="Contraseña"
              onChange={this.handleChange}
            />
            <div className="login__button-container">
              <button type="submit" className="login__link">
                Inicia Sesión
              </button>
            </div>
          </form>

          <div className="login__signup">
            <Link to="/register" className="signup__link">
              ¿Aún no eres miembro? Regístrate aquí
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Login);
