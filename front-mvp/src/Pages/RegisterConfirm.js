import logo from "../Assets/Logo-negro.svg";
import "../Styles/register__confirm.scss";
import icon from "../Assets/Send-icon.svg"

export default function RegisterConfirm() {
  return (
    <div className="register__confirm">
      <figure className="register__confirm__logo">
        <img src={logo} alt="logo" />
      </figure>
      <h2>Verifica tu correo</h2>
      <p>
        Para continuar, verifica el correo que te hemos enviado a tu email.
      </p>
      <img src={icon} alt="Verificado" className="register__confirm__icon" />
      <form className="register__confirm__form" action="">
        <button>Terminar</button>
      </form>
      <div className="register__confirm__options">
        <a href="*">No he recibido el correo</a>
      </div>
    </div>
  );
}
