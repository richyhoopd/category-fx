import { Link } from "react-router-dom";
import Logo from "../Assets/Logo-negro.svg";
import Facebook from "../Assets/facebook-brands.svg";
import Instagram from "../Assets/instagram-brands.svg";
import Whatsapp from "../Assets/whatsapp-brands.svg";
import Twitter from "../Assets/twitter-brands.svg";
import "../Styles/footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <img className="footer__logo" src={Logo} alt="" />
      <div className="footer__legal">
        <h2>Producto</h2>
        <Link to="/terms">Terminos y condiciones</Link>
        <Link to="/politics">Politica de privacidad</Link>
        <Link to="/data">Uso de datos</Link>
        <Link to="/cookies">Cookies</Link>
        <Link to="/finanzas">Finanzas</Link>
      </div>
      <div className="footer__bottom">
        <div className="footer__bottom__brand">
          <p>
            ©2020 - 2022 Todos los derechos reservados. cheapc.com.mx es una
            marca registrada en México. <Link to="/cookies">Preferencias de Cookies</Link>, <Link to="/politics">Privacidad</Link> y
            <Link to="/terms"> Terminos y condiciones. </Link>
          </p>
        </div>
        <div className="footer__bottom__social">
          <a href="https://www.facebook.com/cheapc.mx">
            <img src={Facebook} alt="" />
          </a>
          <a href="https://twitter.com/Cheapc__">
            <img src={Twitter} alt="" />
          </a>
          <a href="https://www.instagram.com/cheapc._/">
            <img src={Instagram} alt="" />
          </a>
          <a href="https://api.whatsapp.com/send?phone=5213325378780&text=%C2%A1Hola!%20Quisiera%20saber%20m%C3%A1s%20acerca%20de%20como%20reparar%20con%20chipsi.">
            <img src={Whatsapp} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
}
