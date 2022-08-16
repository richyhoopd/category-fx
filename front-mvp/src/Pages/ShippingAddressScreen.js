import logo from "../Assets/Logo-negro.svg";
import '../Styles/register__home.scss';
import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from '../Store';
import Footer from "../Components/Footer";

export default function ShippingAddressScreen() {

    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        userInfo,
        cart: { shippingAddress },
    } = state;

    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [cp, setCp] = useState(shippingAddress.cp || '');
    const [country, setCountry] = useState(shippingAddress.country || '');
    const [addressType, setAddressType] = useState(shippingAddress.addressType || '');

    useEffect(() => {
        if(!userInfo) {
            navigate('/login?redirect=/envio');
        }
    }, [userInfo, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({ 
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                cp,
                country,
                addressType
            }
        });
        localStorage.setItem(
            'direccionenvio',
            JSON.stringify({
                fullName,
                address,
                city,
                cp,
                country
            })
        );
        navigate('/pago')
    }

  return (
    <>
    <div className="register__home">
      
        <Helmet>Dirección de envio</Helmet>
      <figure className="register__home__logo">
        <img src={logo} alt="logo" />
      </figure>
      <h2>Agrega tu domicilio</h2>
      <p>Para brindar una mejor experiencia necesitamos conocerte</p>
      <form onSubmit={submitHandler} className="register__home__form">
      <input type="name" placeholder="Nombre completo" value={fullName} onChange={(e) => setFullName(e.target.value)} required/>
      <input type="street-address" placeholder="Dirección" value={address} onChange={(e) => setAddress(e.target.value)} required />
      <input type="city" placeholder="Ciudad" value={city} onChange={(e) => setCity(e.target.value)} required/>
      <input type="postal" placeholder="Codigo Postal" value={cp} onChange={(e) => setCp(e.target.value)} required/>
        <input type="country" placeholder="País" value={country} onChange={(e) => setCountry(e.target.value)} required/>
        <select name="hogar" id="register__home__form-hogar" value={addressType} onChange={(e) => setAddressType(e.target.value)} required>
          <option value="" disabled selected>
            Apartamento, piso o casa
          </option>
          <option value="Casa">Casa</option>
          <option value="Piso">Piso</option>
          <option value="Apartamento">Apartamento</option>
          <option value="Otro">Otro</option>
        </select>
        <button type="submit">Terminar</button>
      </form>
      <div className="register__home__options">
        <a href="*">Regresar</a>
      </div>
    </div>
    <Footer />
    </>
  );
}
