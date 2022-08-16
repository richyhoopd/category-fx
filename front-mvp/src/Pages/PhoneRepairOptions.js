import FormTop from "../Components/FormTop";
import Nav from "../Components/Nav";
import Ipad from "../Assets/Ipad-icon.png";
import { Link } from "react-router-dom";
import "../Styles/form__problem.scss";
import Footer from "../Components/Footer";
import crackedS from '../Assets/screencrack.png' 
// import { useContext, useEffect, useState } from 'react';
// import { Store } from '../Store';
// import axios from "axios";



    

export default function PhoneRepairOptions() {
    
  return (
    <>
    <div className="form__problem">
      <Nav />
      <FormTop
        tittle="Cuentanos tu problema con tu celular"
        parragraph="Elige entre los problemas mas comunes o contactanos por whatsapp si no encuentras lo que busacas!"
        current2="form__top-progress-bar-current"
      />
      <form action="" className="form__problem__container">
        
        <input type="checkbox" id="Pantalla" />
        <label htmlFor="Pantalla">
          <img src={crackedS} alt="" />
          <span>Pantalla</span>
          <p>Estrellada, rayada o mojada</p>
        </label>
        
        <input type="checkbox" id="Bateria" />
        <label htmlFor="Bateria">
          <img src={Ipad} alt="" />
          <span>Bateria</span>
          <p>Dura poco, no carga, no prende</p>
        </label>
        
        <input type="checkbox" id="centro__de__carga" />
        <label htmlFor="centro__de__carga">
          <img src={Ipad} alt="" />
          <span>Carga</span>
          <p>Tienes que mover el cargador para que cargue</p>
        </label>
        
        <input type="checkbox" id="Microfono" />
        <label htmlFor="Microfono">
          <img src={Ipad} alt="" />
          <span>Microfono</span>
          <p>No te escuchan en llamadas</p>
        </label>
        
        <input type="checkbox" id="Audicular" />
        <label htmlFor="Audicular">
          <img src={Ipad} alt="" />
          <span>Audicular</span>
          <p>No te funcionan tus audifonos al conectarlos</p>
        </label>
        
        <input type="checkbox" id="señal" />
        <label htmlFor="señal">
          <img src={Ipad} alt="" />
          <span>Señal</span>
          <p>Poca recepcion, te quedas sin señal</p>
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
          <p>No puedes subir o bajar volumen</p>
        </label>
        
        <input type="checkbox" id="carga__de__so" />
        <label htmlFor="carga__de__so">
          <img src={Ipad} alt="" />
          <span>Carga de SO</span>
          <p>Olvidaste tu cuenta?</p>
        </label>
      </form>
      <div className="form__problem__buttons">
        <Link to="/repara/dispositivo">Siguiente</Link>
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
