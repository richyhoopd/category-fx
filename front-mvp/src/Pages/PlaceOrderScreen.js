import { Helmet } from "react-helmet-async";
import Axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Store } from "../Store";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import Card from "../Assets/Card-icon.png";
import CashIco from "../Assets/Money-icon.png";
import PaypalIco from "../Assets/Paypal-icon.png";
import "../Styles/pay.scss";
import Swal from "sweetalert2";
import Footer from "../Components/Footer";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function PlaceOrderScreen() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo, tip } = state;

  // const [tipVal, setTipVal] = useState(tip || 0);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = 39;
  cart.taxPrice = round2(0.16 * cart.itemsPrice);
  cart.warrantyPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice =
    cart.itemsPrice + cart.shippingPrice + cart.taxPrice + cart.warrantyPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });

      const { data } = await Axios.post(
        "/api/orders",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          warrantyPrice: cart.warrantyPrice,
          totalPrice: cart.totalPrice,
          tip: cart.tip,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  // const submitTipHandler = (e) => {
  //   e.preventDefault();
  //   ctxDispatch({ type: "SAVE_TIP_VALUE", payload: tipVal });
  //   localStorage.setItem("tip", tipVal);
  // };

  return (
    <>
    <div className="pay">
      <Helmet>Pagar</Helmet>
      <Nav />
      <h2>Ya casi terminas</h2>
      <div className="pay__container">
        <div className="pay__container__details">
          <div className="pay__container__details-address">
            <h3>Direccion de entrega</h3>
            <p>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
              {cart.shippingAddress.cp}, {cart.shippingAddress.country}
            </p>
            <Link to="/envio">Cambiar</Link>
          </div>
          <div className="pay__container__details-product">
            <h3>{cart.shippingAddress.fullName}, Ordenaste:</h3>
            {cart.cartItems.map((item) => (
              <div className="pay__container__details-product-item">
                <img src={item.image} alt={item.name} />
                <div className="pay__container__details-product-item-text">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pay__container__details-method">
            <div className="pay__container__details-method-tittle">
              <h3>Metodo de pago</h3>
              <Link to="/pago">Cambiar</Link>
            </div>
            <div className="pay__container__details-method-current">
              {cart.paymentMethod === "PayPal" ? (
                <img src={PaypalIco} alt="" />
              ) : cart.paymentMethod === "Cash" ? (
                <img src={CashIco} alt="" />
              ) : (
                <img src={Card} alt="" />
              )}

              <div className="pay__container__details-method-current-text">
                <p>{cart.paymentMethod}</p>
                <span>{cart.shippingAddress.fullName}</span>
              </div>
            </div>
          </div>
          {/* <div className="pay__container__details-extra">
            <h3>Por favor danos propina, Chipsi nos esclaviza</h3>
            <form onSubmit={submitTipHandler} className="pay__container__details-extra-form">
              <input
                type="radio"
                id="30"
                name="extra"
                value="30"
                checked={tipVal === "30"}
                onChange={(e) => setTipVal(e.target.value)}
              />
              <label htmlFor="30">$30</label>
              <input
                type="radio"
                id="30"
                name="extra"
                value="30"
                checked={tipVal === "30"}
                onChange={(e) => setTipVal(e.target.value)}
              />
              <label htmlFor="40">$40</label>
              <input
                type="radio"
                id="10"
                name="extra"
                value="30"
                checked={tipVal === "30"}
                onChange={(e) => setTipVal(e.target.value)}
              />
              <label htmlFor="10">$20</label>
              <input
                type="radio"
                id="otro"
                name="extra"
                value="20"
                checked={tipVal === "20"}
                onChange={(e) => setTipVal(e.target.value)}
              />
              <label htmlFor="10">$10</label>
              <input
                type="radio"
                placeholder="$10"
                value="10"
                checked={tipVal === "10"}
                onChange={(e) => setTipVal(e.target.value)}
              />
            </form>
          </div> */}
        </div>
        <div className="pay__container__price">
          <h3>Resumen</h3>
          <div className="pay__container__price-container">
            <div className="pay__container__price-container-item">
              <p>Servicio</p>
              <span>${cart.itemsPrice.toFixed(2)}</span>
            </div>
            <div className="pay__container__price-container-item">
              <p>IVA</p>
              <span>${cart.taxPrice.toFixed(2)}</span>
            </div>
            <div className="pay__container__price-container-item">
              <p>Garantia</p>
              <span>${cart.warrantyPrice.toFixed(2)}</span>
            </div>
            <div className="pay__container__price-container-item">
              <p>Envio</p>
              <span>${cart.shippingPrice}.00</span>
            </div>
            <div className="pay__container__price-container-item">
              <p>Propina (ayuda por favor)</p>
              <span>{tip}</span>
            </div>
          </div>
          <div className="pay__container__price-total">
            <h3>Total</h3>
            <span>${cart.totalPrice.toFixed(2)}</span>
          </div>
          <button
            type="button"
            onClick={placeOrderHandler}
            disabled={cart.cartItems.lenght === 0}
          >
            Solicitar servicio
          </button>
        </div>
        {loading && <div>Cargando...</div>}
      </div>
    </div>
    <Footer />
    </>
    // <div>
    //   <Helmet>
    //     <title>Terminar pedido</title>
    //   </Helmet>
    //   <h1>Preview de la orden</h1>
    //   <div>
    //     <h2>Envio:</h2>
    //     <strong>Nombre:</strong> {cart.shippingAddress.fullName} <br />
    //     <strong>Address:</strong> {cart.shippingAddress.address},{" "}
    //     {cart.shippingAddress.city}, {cart.shippingAddress.cp},{" "}
    //     {cart.shippingAddress.country} <br />
    //   </div>
    //   <div>
    //     <Link to="/envio" >Editar</Link>
    //   </div>
    //   <div>
    //     <h2>Metodo de pago:</h2>
    //     <strong>Metodo:</strong> {cart.paymentMethod} <br />
    //     <Link to="/pago" >Elegir otro metodo de pago</Link>
    //   </div>
    //   <div>
    //     <h2>Informaciond del servicio:</h2>
    //     {cart.cartItems.map((item) => (
    //         <div key={item._id}>
    //             <img src={item.image} alt={item.name} />{' '}
    //             <Link to={`/product/${item.slug}`} >{item.name}</Link> <br />
    //             <p>{item.quantity}</p>
    //             <p>{item.price}</p>
    //         </div>
    //     ))}
    //     <Link to="/cart" ></Link>
    //   </div>
    // </div>
    
  );
}
