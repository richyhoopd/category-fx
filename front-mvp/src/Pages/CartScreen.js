import Nav from "../Components/Nav";
import "../Styles/cart.scss";
import { Store } from "../Store";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Components/Footer";

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/envio");
  };

  return (
    <>
      <div className="cart">
        <Helmet>
          <title>Carrito de compras</title>
        </Helmet>
        <Nav />
        <h2>Carrito</h2>
        {cartItems.lenght === 0 ? (
          <h3>El carrito esta vacio, agrega algo!</h3>
        ) : (
          <div className="cart__container">
            <div className="cart__container__products">
              {cartItems.map((item) => (
                <div className="cart__container__products-item" key={item._id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart__container__products-item-text">
                    <h4>${item.price}</h4>
                    <p>{item.name}</p>
                    <div className="cart__container__products-item-text-options">
                      <button onClick={() => removeItemHandler(item)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <p className="piolin">
                Chipsi garantiza la seguridad de tu dispositivo en todo momento,
                si tienes dudas o necesitas reparaciones mas especificas no
                dudes en escribirnos!
              </p>
              <a
                className="cotiza"
                href="https://api.whatsapp.com/send?phone=5213325378780&text=%C2%A1Hola!%20Quisiera%20saber%20m%C3%A1s%20acerca%20de%20como%20reparar%20con%20chipsi."
              >
                Cotiza por whatsapp
              </a>
            </div>
            <div className="cart__container__price">
              <h3>
                TOTAL{" "}
                <span>
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                  items) : $
                  {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </span>
              </h3>
              <button
                type="button"
                variant="primary"
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Pagar
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
