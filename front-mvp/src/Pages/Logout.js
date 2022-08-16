import logo from "../Assets/Logo-negro.svg";
import "../Styles/register__confirm.scss";
import icon from "../Assets/Send-icon.svg"
import { Link } from "react-router-dom";

export default function RegisterConfirm() {
  return (
    <div className="register__confirm">
      <figure className="register__confirm__logo">
        <img src={logo} alt="logo" />
      </figure>
      <h2>Saliste de tu cuenta</h2>
      <p>
        presiona terminar, para volver al inicio.
      </p>
      <img src={icon} alt="Verificado" className="register__confirm__icon" />
      <form className="register__confirm__form" action="">
        <Link to="/">Terminar</Link>
      </form>
      <div className="register__confirm__options">
        <Link to="/login">Iniciar sesión</Link>
      </div>
    </div>
  );
}
