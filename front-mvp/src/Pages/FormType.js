import Nav from "../Components/Nav";
import Desktop from "../Assets/Desktop-icon.png";
import Laptop from "../Assets/Laptop-icon.png";
import Phone from "../Assets/Phone-icon.png";
import Peripheral from "../Assets/Peripheral-icon.png";
import Component_icon from "../Assets/Component-icon.png";
import Apple from "../Assets/Apple-icon.png";
import FormTop from "../Components/FormTop";
import "../Styles/form__type.scss";
import Footer from "../Components/Footer";
import { Link } from 'react-router-dom';


export default function FormType() {
  return (
    <>
      <div className="form__type">
        <Nav />
        <FormTop
          tittle="Cuéntanos un poco"
          parragraph="¿Qué tipo de electrónico es tu dispositivo?"
          current1="form__top-progress-bar-current"
        />
        <div className="form__type__select">
        <Link to={`/repara/pc`} href="*"  >
          <img src={Desktop} alt="" />
          <p>PC</p>
        </Link>
        <Link to={`/repara/laptop`} href="*"  >
          <img src={Laptop} alt="" />
          <p>Laptop</p>
        </Link>
        <Link to={`/repara/celulares`} href="*"  >
          <img src={Phone} alt="" />
          <p>Celular</p>
        </Link>
        <Link to={`/repara/lineablanca`} href="*"  >
          <img src={Peripheral} alt="" />
          <p>Periféricos</p>
        </Link>
        <Link to={`/repara/componentes`} href="*"  >
          <img src={Component_icon} alt="" />
          <p>Componentes</p>
        </Link>
        <Link to={`/repara/apple`} href="*"  >
          <img src={Apple} alt="" />
          <p>Apple</p>
        </Link>
        </div>
        <div className="form__type__bottom">
          <a className="cotiza" href="https://api.whatsapp.com/send?phone=5213325378780&text=%C2%A1Hola!%20Quisiera%20saber%20m%C3%A1s%20acerca%20de%20como%20reparar%20con%20chipsi.">
            Cotiza por whatsapp
          </a>
          <p>
            Al seguir con este formulario aceptas todos los{" "}
            <a href="*">términos y condiciones.</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
