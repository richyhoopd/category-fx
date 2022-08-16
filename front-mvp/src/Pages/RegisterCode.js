import logo from "../Assets/Logo-negro.svg";
import "../Styles/register__code.scss";

export default function RegisterCode() {
  return (
    <div className="register__code">
      <figure className="register__code__logo">
        <img src={logo} alt="logo" />
      </figure>
      <h2>Código enviado a tu correo</h2>
      <p>Ingresa el código de 6 dígitos que te hemos proporcionado</p>
      <form action="" className="register__code__form">
        <div className="register__code__form-inputs">
          <input className="register__code__form-inputs-input" maxLength={1} placeholder="0" type="number" min={0} max={10} />
          <input className="register__code__form-inputs-input" maxLength={1} placeholder="0" type="number" min={0} max={10} />
          <input className="register__code__form-inputs-input" maxLength={1} placeholder="0" type="number" min={0} max={10} />
          <input className="register__code__form-inputs-input" maxLength={1} placeholder="0" type="number" min={0} max={10} />
          <input className="register__code__form-inputs-input" maxLength={1} placeholder="0" type="number" min={0} max={10} />
          <input className="register__code__form-inputs-input" maxLength={1} placeholder="0" type="number" min={0} max={10} />
        </div>
        <button>Confirmar</button>
      </form>
      <div className="register__code__options">
        <a href="*">Reenviar código</a>
        <a href="*">Necesito ayuda</a>
      </div>
    </div>
  );
}
