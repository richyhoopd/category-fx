import logo from "../Assets/Logo-negro.svg";
import '../Styles/register__home.scss';

export default function RegisterHome() {
  return (
    <div className="register__home">
      <figure className="register__home__logo">
        <img src={logo} alt="logo" />
      </figure>
      <h2>Agrega tu domicilio</h2>
      <p>Para brindar una mejor experiencia necesitamos conocerte</p>
      <form action="" className="register__home__form">
      <input type="name" placeholder="Nombre completo" />
      <input type="street-address" placeholder="Dirección" />
      <input type="city" placeholder="Ciudad" />
      <input type="postal" placeholder="Codigo Postal" />
        <input type="country" placeholder="País" />
        <select name="hogar" id="register__home__form-hogar">
          <option value="" disabled selected>
            Apartamento, piso o casa
          </option>
          <option value="Casa">Casa</option>
          <option value="Piso">Piso</option>
          <option value="Apartamento">Apartamento</option>
          <option value="Otro">Otro</option>
        </select>
        <button>Terminar</button>
      </form>
      <div className="register__home__options">
        <a href="*">Omitir por ahora</a>
        <a href="*">Regresar</a>
      </div>
    </div>
  );
}
