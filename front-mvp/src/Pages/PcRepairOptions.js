import FormTop from "../Components/FormTop";
import Nav from "../Components/Nav";
import { Link } from "react-router-dom";
import "../Styles/form__problem.scss";
import Footer from "../Components/Footer";
import Desktop from "../Assets/Desktop-icon.png";

export default function PcRepairOptions() {
  return (
    <>
    <div className="form__problem">
      <Nav />
      <FormTop
        tittle="Cuentanos el problema con tu computadora de escritorio"
        parragraph="¡Puedes agregar distintas reparaciones para un mismo dispositivo!"
        current2="form__top-progress-bar-current"
      />
      <form action="" className="form__problem__container">
        
        <input type="checkbox" id="Pantalla" />
        <label htmlFor="Pantalla">
          <img src={Desktop} alt="" />
          <span>Lenta</span>
          <p>Se congela, se traba, se detiene</p>
        </label>
        
        <input type="checkbox" id="Bateria" />
        <label htmlFor="Bateria">
          <img src={Desktop} alt="" />
          <span>Virus</span>
          <p>Abre ventanas de la nada, muchos anuncios</p>
        </label>
        
        <input type="checkbox" id="centro__de__carga" />
        <label htmlFor="centro__de__carga">
          <img src={Desktop} alt="" />
          <span>Pantalla Azul</span>
          <p>errores con pantallas azul </p>
        </label>
        
        <input type="checkbox" id="Microfono" />
        <label htmlFor="Microfono">
          <img src={Desktop} alt="" />
          <span>Apagones</span>
          <p>apagones o reinicios repentinos</p>
        </label>
        
        <input type="checkbox" id="Audicular" />
        <label htmlFor="Audicular">
          <img src={Desktop} alt="" />
          <span>Almacenamiento</span>
          <p>Lento, lleno, por terminarse</p>
        </label>
        
        <input type="checkbox" id="señal" />
        <label htmlFor="señal">
          <img src={Desktop} alt="" />
          <span>Ruidos</span>
          <p>tiene ruidos extraños</p>
        </label>
        
        <input type="checkbox" id="tapa" />
        <label htmlFor="tapa">
          <img src={Desktop} alt="" />
          <span>Sobrecalentamiento</span>
          <p>Se siente caliente</p>
        </label>
        
        <input type="checkbox" id="botones" />
        <label htmlFor="botones">
          <img src={Desktop} alt="" />
          <span>Programas</span>
          <p>Necesitas algun programa?</p>
        </label>
        
        <input type="checkbox" id="carga__de__so" />
        <label htmlFor="carga__de__so">
          <img src={Desktop} alt="" />
          <span>Carga de SO</span>
          <p>cambio de so, instalacion de so y recuperacion</p>
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
