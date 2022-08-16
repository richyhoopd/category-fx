import FormTop from "../Components/FormTop";
import Nav from "../Components/Nav";
import Ipad from "../Assets/Ipad-icon.png";
import { Link } from "react-router-dom";
import "../Styles/form__problem.scss";
import Footer from "../Components/Footer";

export default function FormProblem() {
  return (
    <>
    <div className="form__problem">
      <Nav />
      <FormTop
        tittle="Cuentanos tu problema"
        parragraph="¡Puedes agregar distintas reparaciones para un mismo dispositivo!"
        current3="form__top-progress-bar-current"
      />
      <form action="" className="form__problem__container">
        
        <input type="checkbox" id="Pantalla" />
        <label htmlFor="Pantalla">
          <img src={Ipad} alt="" />
          <span>Pantalla</span>
          <p>Estrellada, rayada o mojada</p>
        </label>
        
        <input type="checkbox" id="Bateria" />
        <label htmlFor="Bateria">
          <img src={Ipad} alt="" />
          <span>Bateria</span>
          <p>Estrellada, rayada o mojada</p>
        </label>
        
        <input type="checkbox" id="centro__de__carga" />
        <label htmlFor="centro__de__carga">
          <img src={Ipad} alt="" />
          <span>Carga</span>
          <p>Estrellada, rayada o mojada</p>
        </label>
        
        <input type="checkbox" id="Microfono" />
        <label htmlFor="Microfono">
          <img src={Ipad} alt="" />
          <span>Microfono</span>
          <p>Estrellada, rayada o mojada</p>
        </label>
        
        <input type="checkbox" id="Audicular" />
        <label htmlFor="Audicular">
          <img src={Ipad} alt="" />
          <span>Audicular</span>
          <p>Estrellada, rayada o mojada</p>
        </label>
        
        <input type="checkbox" id="señal" />
        <label htmlFor="señal">
          <img src={Ipad} alt="" />
          <span>Señal</span>
          <p>Estrellada, rayada o mojada</p>
        </label>
        
        <input type="checkbox" id="tapa" />
        <label htmlFor="tapa">
          <img src={Ipad} alt="" />
          <span>Tapas</span>
          <p>Estrellada, rayada o mojada</p>
        </label>
        
        <input type="checkbox" id="botones" />
        <label htmlFor="botones">
          <img src={Ipad} alt="" />
          <span>Botones</span>
          <p>Estrellada, rayada o mojada</p>
        </label>
        
        <input type="checkbox" id="carga__de__so" />
        <label htmlFor="carga__de__so">
          <img src={Ipad} alt="" />
          <span>Carga de SO</span>
          <p>Estrellada, rayada o mojada</p>
        </label>
      </form>
      <div className="form__problem__buttons">
        <Link to="/form/confirm">Siguiente</Link>
        <a
            className="cotiza"
            href="https://api.whatsapp.com/send?phone=5213325378780&text=%C2%A1Hola!%20Quisiera%20saber%20m%C3%A1s%20acerca%20de%20como%20reparar%20con%20chipsi."
          >
            Cotiza por whatsapp
          </a>
      </div>
    </div>
    <Footer />
    </> 
  );
}
