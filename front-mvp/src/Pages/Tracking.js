import Nav from "../Components/Nav";
import '../Styles/tracking.scss';

export default function Tracking() {
  return (
    <div className="tracking">
      <Nav />
      <h2 className="lolgrande">Gracias por comprar en Chipsi!</h2>
      <p className="lol">
        El repartidor esta en camino, cuando llegue asegurate de pedir su codigo
        de verificacion antes de entregar tu dispositivo.
      </p>
      <span className="lolspan">1842</span>
      <div className="tracking__steps">
        <div className="tracking__steps-step">
          <span className="step__ready">A</span>
          <span className="progress progress__ready"></span>
          <div className="tracking__steps-step-text">
            <h3>En camino</h3>
            <p>El repartido recogera tu dispositivo</p>
          </div>
        </div>
        <div className="tracking__steps-step">
          <span className="step__ready">B</span>
          <span className="progress"></span>
          <div className="tracking__steps-step-text">
            <h3>Tu casa</h3>
            <p>Repartidor fuera de tu casa</p>
          </div>
        </div>
        <div className="tracking__steps-step">
          <span>C</span>
          <span className="progress"></span>
          <div className="tracking__steps-step-text">
            <h3>Taller</h3>
            <p>El dispositivo esta siendo reparado</p>
          </div>
        </div>
        <div className="tracking__steps-step">
          <span>D</span>
          <span className="progress"></span>
          <div className="tracking__steps-step-text">
            <h3>En camino de regreso</h3>
            <p>Tu dispositivo esta en camino de regreso</p>
          </div>
        </div>
        <div className="tracking__steps-step">
          <span>E</span>
          <div className="tracking__steps-step-text">
            <h3>Tu casa</h3>
            <p>El dispositivo de vuelta a tus manos</p>
          </div>
        </div>
      </div>
      <div className="tracking__buttons">
        <button>Contactar al reparador</button>
        <button>Contactar al repartidor</button>
      </div>
    </div>
  );
}
