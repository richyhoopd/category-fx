import React, { useEffect, useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import Nav from "../Components/Nav";
import "../Styles/pay__methods.scss";
import Card from "../Assets/Card-icon.png";
import Money from "../Assets/Money-icon.png";
import Paypal from "../Assets/Paypal-icon.png";
import Footer from "../Components/Footer";

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/envio");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/orden");
  };
  return (
    <>

    <div className="pay__methods">
      <Helmet>
         <title>Metodos de pago</title>
       </Helmet>
      <Nav />
      
      <h2>Selecciona tu metodo de pago</h2>
      <form onSubmit={submitHandler} className="pay__methods__container">
        <input
          type="radio"
          id="Cash"
          name="Pay"
          value="Cash"
          checked={paymentMethodName === "Cash"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label htmlFor="Cash" className="pay__methods__container-item">
          <img src={Money} alt="" />
          <div className="pay__methods__container-item-text">
            <h3>Efectivo</h3>
          </div>
        </label>
        <input
          type="radio"
          id="Paypal"
          name="Pay"
          value="PayPal"
          checked={paymentMethodName === "PayPal"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label htmlFor="Paypal" className="pay__methods__container-item">
          <img src={Paypal} alt="" />
          <div className="pay__methods__container-item-text">
            <h3>Paypal</h3>
          </div>
        </label>
        <input type="radio" id="Card" name="Pay" value="Stripe"
           checked={paymentMethodName === "Stripe"}
           onChange={(e) => setPaymentMethod(e.target.value)}/>
        <label htmlFor="Card" className="pay__methods__container-item">
          <img src={Card} alt="" />
          <div className="pay__methods__container-item-text">
            <h3>Tarjeta</h3>
          </div>
        </label>
        <button type='submit' className="si" >
        Siguiente
      </button>
      </form>
      
    </div>
    <Footer />
    </>
  );
}
