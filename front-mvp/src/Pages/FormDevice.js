import FormTop from "../Components/FormTop";
import Nav from "../Components/Nav";
import "../Styles/form__device.scss";
import Footer from "../Components/Footer";

export default function FormDevice() {
  return (
    <>
      <div className="form__device">
        <Nav />
        <FormTop
          tittle="Características adicionales"
          parragraph="Danos más detalles de tu dispositivo para poder brindarte la mejor seguridad"
          current3="form__top-progress-bar-current"
        />
        <form action="" className="form__device__form">
          <select name="type">
            <option value="PC">PC</option>
            <option value="Laptop">Laptop</option>
            <option value="Celular" selected="true">Celular</option>
            <option value="Periferico">
              Periferico
            </option>
            <option value="Componente">Componente</option>
            <option value="Apple">Apple</option>
          </select>
          <input type="text" list="marca" placeholder="Marca" />
          <datalist id="marca">
            <option value="Huawei">Huawei</option>
            <option value="ZTE">ZTE</option>
            <option value="Motorola">Motorola</option>
            <option value="Samsung">Samsung</option>
            <option value="Xiaomi">Xiaomi</option>
            <option value="Apple">Apple</option>
          </datalist>
          <input type="text" placeholder="Linea" />
          <input type="text" placeholder="Modelo" />
          <input type="text" placeholder="Numero de serie (opcional)" />
          <textarea
            name="Description"
            cols="30"
            rows="10"
            placeholder="Descripción rápida de tu dispositivo (opcional)"
          ></textarea>
          <button>Continuar</button>
          <a
            className="cotiza"
            href="https://api.whatsapp.com/send?phone=5213325378780&text=%C2%A1Hola!%20Quisiera%20saber%20m%C3%A1s%20acerca%20de%20como%20reparar%20con%20chipsi."
          >
            Cotiza por whatsapp
          </a>
        </form>
      </div>
      <Footer />
    </>
  );
}
