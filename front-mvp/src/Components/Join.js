import DeliveryImg from "../Assets/Delivery-img.png";
import WorkshopImg from "../Assets/Workshop-img.png";

export default function Join() {
  return (
    <section className="home__join">
      <h2>Únete a Chipsi</h2>
      <div className="home__join__items">
        <div className="home__join__items-item">
          <img src={DeliveryImg} alt="delivery" />
          <div className="home__join__items-item-text">
            <h4>Haz entregas</h4>
            <p>
              Recoge y entrega mercancía de usuarios con una comisión por cada
              viaje.
            </p>
            <button>Conocer mas</button>
          </div>
        </div>
        <div className="home__join__items-item">
          <img src={WorkshopImg} alt="Taller" />
          <div className="home__join__items-item-text">
            <h4>Registra tu taller</h4>
            <p>
              En pocos pasos registra tu taller de reparación de cualquier tipo
              de electrónicos para ofrecer tus servicios a quien lo necesite.
            </p>
            <button>Conocer más</button>
          </div>
        </div>
      </div>
    </section>
  );
}
