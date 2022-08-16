import FormTop from "../Components/FormTop";
import Nav from "../Components/Nav";
import { Link } from "react-router-dom";
import "../Styles/form__problem.scss";
import Footer from "../Components/Footer";
import Component_icon from "../Assets/Component-icon.png";

export default function ComponentsRepairOptions() {
  return (
    <>
    <div className="form__problem">
      <Nav />
      <FormTop
        tittle="Cuentanos tu problema"
        parragraph="¡Puedes agregar distintas reparaciones para un mismo dispositivo!"
        current2="form__top-progress-bar-current"
      />
      <form action="" className="form__problem__container">
        
        <input type="checkbox" id="Pantalla" />
        <label htmlFor="Pantalla">
          <img src={Component_icon} alt="" />
          <span>Pantalla</span>
          <p>Estrellada, rayada o mojada</p>
        </label>
        
        <input type="checkbox" id="Bateria" />
        <label htmlFor="Bateria">
          <img src={Component_icon} alt="" />
          <span>Bateria</span>
          <p>Estrellada, rayada o mojada</p>
        </label>
        
        <input type="checkbox" id="centro__de__carga" />
        <label htmlFor="centro__de__carga">
          <img src={Component_icon} alt="" />
          <span>Carga</span>
          <p>Estrellada, rayada o mojada</p>
        </label>
        
        <input type="checkbox" id="Microfono" />
        <label htmlFor="Microfono">
          <img src={Component_icon} alt="" />
          <span>Microfono</span>
          <p>Estrellada, rayada o mojada</p>
        </label>
        
        <input type="checkbox" id="Audicular" />
        <label htmlFor="Audicular">
          <img src={Component_icon} alt="" />
          <span>Audicular</span>
          <p>Estrellada, rayada o mojada</p>
        </label>
        
        <input type="checkbox" id="señal" />
        <label htmlFor="señal">
          <img src={Component_icon} alt="" />
          <span>Señal</span>
          <p>Estrellada, rayada o mojada</p>
        </label>
        
        <input type="checkbox" id="tapa" />
        <label htmlFor="tapa">
          <img src={Component_icon} alt="" />
          <span>Tapas</span>
          <p>Estrellada, rayada o mojada</p>
        </label>
        
        <input type="checkbox" id="botones" />
        <label htmlFor="botones">
          <img src={Component_icon} alt="" />
          <span>Botones</span>
          <p>Estrellada, rayada o mojada</p>
        </label>
        
        <input type="checkbox" id="carga__de__so" />
        <label htmlFor="carga__de__so">
          <img src={Component_icon} alt="" />
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
