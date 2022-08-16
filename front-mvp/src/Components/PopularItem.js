import { Link } from "react-router-dom";
import Delivery from "../Assets/Delivery-icon.svg";
import Shield from "../Assets/Shield-icon.svg";
import Clock from "../Assets/Clock-icon.svg";

export default function PopularItem(props) {
  const { product } = props;
  return (
    <Link to={`product/${product.slug}`} className="home__popular-item">
      <img src={product.image} alt="" />
      <div className="home__popular-item-text">
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <span>
          <img src={Shield} alt="" /> Garantia de {product.warranty}
        </span>
        <span>
          <img src={Clock} alt="" />
          Entrega en 24h
        </span>
        <span>
          <img src={Delivery} alt="" />
          Envió gratis
        </span>
      </div>
    </Link>
  );
}
