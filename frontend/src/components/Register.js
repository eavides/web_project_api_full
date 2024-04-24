import React from "react";
import * as auth from "../utils/auth.js";
import { Link, withRouter } from "react-router-dom";
import InfoTooltip from "./InfoTooltip.js";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.exitwin = this.exitwin.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  handleRegister(custate) {
    this.props.handleRegister(custate);
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.password === this.state.confirmPassword) {
      let { password, email } = this.state;
      auth
        .register(password, email)
        .then((res) => {
          if (res) {
            this.handleRegister(true);
            this.props.history.push("/login");
          } else {
            this.setState({
              message: "¡Algo salió mal!",
            });
          }
        })
        .catch((err) => {
          this.props.setIsLoggedIn(true);
          this.props.setIsFail(true);
        });
    } else {
      this.props.setIsLoggedIn(true);
      this.props.setIsFail(true);
    }
  }
  exitwin(state) {
    this.props.setIsLoggedIn(state);

    this.props.setIsFail(state);
  }

  render() {
    return (
      <>
        <InfoTooltip
          isOpen={this.props.isRegistered}
          isWrong={this.props.isWrong}
          closeWin={this.exitwin}
          reg={true}
        ></InfoTooltip>
        <div className="register">
          <h3 className="register__title">Regístrate</h3>
          <form className="register__form form__format">
            <input
              name="email"
              type="email"
              className="register__format"
              value={this.state.email}
              placeholder="Correo Electrónico"
              onChange={this.handleChange}
            />
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              className="register__format"
              placeholder="Contraseña"
            />
            <input
              name="confirmPassword"
              type="password"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              className="register__format"
              placeholder="Confirmar Contraseña"
            />
            <p>{this.regerror}</p>
            <div className="register__button-container">
              <button onClick={this.handleSubmit} className="register__link">
                Regístrate
              </button>
            </div>
          </form>

          <div className="register__signin">
            <Link to="/login" className="register__login-link">
              ¿Ya eres miembro? Inicia sesión aquí
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Register);
