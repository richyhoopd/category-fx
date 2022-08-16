import logo from "../Assets/Logo-negro.svg";
import '../Styles/register__personal.scss';

export default function RegisterPersonal() {
  return (
    <div className="register__personal">
      <figure className="register__personal__logo">
        <img src={logo} alt="logo" />
      </figure>
      <h2>Cuéntanos más de ti</h2>
      <p>Todos tus datos están protegidos por nosotros</p>
      <form action="" className="register__personal__form">
        <input type="number" min={1} placeholder="¿Cuál es tu edad?" />
        <input type="text" placeholder="¿A qué te dedicas?" />
        <select
          name="genero"
          id="register__personal__form-genero"
        >
          <option value="" disabled selected>Género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
          <option value="Prefiero no decirlo">Prefiero no decirlo</option>
        </select>
        <button>Siguiente</button>
      </form>
      <div className="register__personal__options">
        <a href="*">Omitir por ahora</a>
        <a href="*">Regresar</a>
      </div>
    </div>
  );
}
