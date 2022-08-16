import logo from "../Assets/Logo-negro.svg";
import Icon from '../Assets/SplashScreen-icon.svg';
import '../Styles/splash__screen.scss';

export default function SplashScreen() {
  return (
    <div className="splash__screen">
      <figure className="splash__screen__logo">
        <img src={logo} alt="logo" />
      </figure>
      <p>
        ¿Sabias que para producir un kg de carne y un celular se requiere una
        cantidad similar de agua?
      </p>
      <img className="splash__screen__icon" src={Icon} alt="Cargando" />
    </div>
  );
}
