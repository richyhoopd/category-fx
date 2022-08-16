import "../Styles/form__confirm.scss";
import Nav from "../Components/Nav";
import FormTop from "../Components/FormTop";
import Delivery from "../Assets/Delivery-icon.svg";
import Clock from "../Assets/Clock-icon.svg";
import Shield from "../Assets/Shield-icon.svg";
import Mobile from "../Assets/Mobile-img.jpg";
import Star from "../Assets/Star-icon.svg";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";

export default function FormConfirm() {
  return (
    <div className="form__confirm">
      <Nav />
      <FormTop
        tittle="Selecciona tu taller"
        parragraph="Elige el ideal para ti, ¡nosotros hacemos el resto!"
        current4="form__top-progress-bar-current"
      />
      <a
        className="cotiza"
        href="https://api.whatsapp.com/send?phone=5213325378780&text=%C2%A1Hola!%20Quisiera%20saber%20m%C3%A1s%20acerca%20de%20como%20reparar%20con%20chipsi."
      >
        Cotiza por whatsapp
      </a>
      <section className="form__confirm__benefits">
        <div className="form__confirm__benefits-item">
          <img src={Shield} alt="" />
          <div className="form__confirm__benefits-item-text">
            <h3>Garantia de 6 meses</h3>
            <p>Nosotros cuidamos tu dispositivo ¡No te preocupes!</p>
          </div>
        </div>
        <div className="form__confirm__benefits-item">
          <img src={Clock} alt="" />
          <div className="form__confirm__benefits-item-text">
            <h3>Entrega en 24H</h3>
            <p>Llevamos y traemos tu dispositivo en tiempo record</p>
          </div>
        </div>
        <div className="form__confirm__benefits-item">
          <img src={Delivery} alt="" />
          <div className="form__confirm__benefits-item-text">
            <h3>Envio gratis</h3>
            <p>¡Corre por nuestra cuenta!</p>
          </div>
        </div>
      </section>
      <section className="form__confirm__workshops">
        <Link to="/form/success" className="form__confirm__workshops-workshop">
          <img
            src={Mobile}
            alt=""
            className="form__confirm__workshops-workshop-avatar"
          />
          <div className="form__confirm__workshops-workshop-text">
            <h4>$600.50 mxn</h4>
            <p>Taller el abuelo</p>
            <span className="form__confirm__workshops-workshop-text-rate">
              <img src={Star} alt="" />
              <span>4.8</span>
            </span>
          </div>
        </Link>

        <Link to="/form/success" className="form__confirm__workshops-workshop">
          <img
            src={Mobile}
            alt=""
            className="form__confirm__workshops-workshop-avatar"
          />
          <div className="form__confirm__workshops-workshop-text">
            <h4>$392.50 mxn</h4>
            <p>Taller el abuelo</p>
            <span className="form__confirm__workshops-workshop-text-rate">
              <img src={Star} alt="" />
              <span>Nuevo</span>
            </span>
          </div>
        </Link>

        <Link to="/form/success" className="form__confirm__workshops-workshop">
          <img
            src={Mobile}
            alt=""
            className="form__confirm__workshops-workshop-avatar"
          />
          <div className="form__confirm__workshops-workshop-text">
            <h4>$700.00 mxn</h4>
            <p>Taller el abuelo</p>
            <span className="form__confirm__workshops-workshop-text-rate">
              <img src={Star} alt="" />
              <span>4.8</span>
            </span>
          </div>
        </Link>
        <Link to="/form/success" className="form__confirm__workshops-workshop">
          <img
            src={Mobile}
            alt=""
            className="form__confirm__workshops-workshop-avatar"
          />
          <div className="form__confirm__workshops-workshop-text">
            <h4>$152.32 mxn</h4>
            <p>Taller el abuelo</p>
            <span className="form__confirm__workshops-workshop-text-rate">
              <img src={Star} alt="" />
              <span>Nuevo</span>
            </span>
          </div>
        </Link>
        <Link to="/form/success" className="form__confirm__workshops-workshop">
          <img
            src={Mobile}
            alt=""
            className="form__confirm__workshops-workshop-avatar"
          />
          <div className="form__confirm__workshops-workshop-text">
            <h4>$600.50 mxn</h4>
            <p>Taller el abuelo</p>
            <span className="form__confirm__workshops-workshop-text-rate">
              <img src={Star} alt="" />
              <span>4.8</span>
            </span>
          </div>
        </Link>
        <Link to="/form/success" className="form__confirm__workshops-workshop">
          <img
            src={Mobile}
            alt=""
            className="form__confirm__workshops-workshop-avatar"
          />
          <div className="form__confirm__workshops-workshop-text">
            <h4>$600.50 mxn</h4>
            <p>Taller el abuelo</p>
            <span className="form__confirm__workshops-workshop-text-rate">
              <img src={Star} alt="" />
              <span>4.8</span>
            </span>
          </div>
        </Link>
      </section>
      <Footer />
    </div>
  );
}
