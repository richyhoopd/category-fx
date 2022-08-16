import logo from "../Assets/Logo-negro.svg";
import cartIco from "../Assets/Cart-icon.svg";
import burger from "../Assets/Burger-icon.svg";
import avatar from "../Assets/Avatar.png";
import user from "../Assets/User-icon.svg";
import users from "../Assets/Users-icon.svg";
import star from "../Assets/Star-icon.svg";
import star2 from "../Assets/Star-icon 2.svg";
import settings from "../Assets/Settings-icon.svg";
import logout from "../Assets/Logout-icon.svg";
import Xicon from "../Assets/X-icon.svg";
import "../Styles/nav.scss";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import Whatsapp from "../Assets/whatsapp-brands 2.svg";

export default function Nav() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };

  return (
    <nav className="nav">
      <label htmlFor="burger" className="nav__burger">
        <img src={burger} alt="burger" />
      </label>
      <input type="checkbox" id="burger" />
      <div className="nav__menu">
        <label htmlFor="burger" className="nav__menu__x">
          <img src={Xicon} alt="X" />
        </label>
        {userInfo ? (
          <div className="nav__menu__options">
            <div className="nav__menu__user">
              <img src={avatar} alt="Avatar" />
              <div className="nav__menu__user__avatar">
                <p>{userInfo.name}</p>
                <Link to="/perfil">{userInfo.email}</Link>
              </div>
            </div>
            <a href="https://api.whatsapp.com/send?phone=5213325378780&text=%C2%A1Hola!%20Quisiera%20saber%20m%C3%A1s%20acerca%20de%20como%20reparar%20con%20chipsi." className="nav__menu__options__option" id="Escribenos__nav">
              <img src={Whatsapp} alt="whatsapp" />
              <p>Escribenos</p>
            </a>
            <Link to="/perfil" className="nav__menu__options__option">
              <img src={user} alt="user" />
              <p>Perfil</p>
            </Link>
            <Link to="/orderhistory" className="nav__menu__options__option">
              <img src={star} alt="star" />
              <p>Ordenes</p>
            </Link>
            <Link to="/carrito" className="nav__menu__options__option">
              <img src={cartIco} alt="cart" />
              <p>Carrito</p>
            </Link>
            <Link id="null" to="/" className="nav__menu__options__option">
              <img src={settings} alt="settings" />
              <p>Configuración</p>
            </Link>
            <Link
              to="/signout"
              onClick={signoutHandler}
              className="nav__menu__options__option"
            >
              <img src={logout} alt="logout" />
              <p>Cerrar sesión</p>
            </Link>
          </div>
        ) : (
          <div className="nav__menu__options">
            <Link
              id="inicio__sesion"
              to="/login"
              className="nav__menu__options__option not-logged"
            >
              <img src={user} alt="logout" />
              <p>Iniciar Sesion</p>
            </Link>
            <Link
              id="nav__registrarse"
              to="/registro"
              className="nav__menu__options__option not-logged"
            >
              <img src={star2} alt="registro" />
              <p>Registrarse</p>
            </Link>
          </div>
        )}
        {userInfo && userInfo.isAdmin && (
          <div className="nav__menu__options">
            <strong className="admin__el__cacas">ADMIN STUFF</strong>
            <Link to="/admin/dashboard" className="nav__menu__options__option">
              <img src={user} alt="user" />
              <p>Dashboard</p>
            </Link>
            <Link to="/admin/products" className="nav__menu__options__option">
              <img src={star} alt="star" />
              <p>Servicios</p>
            </Link>
            <Link to="/admin/orders" className="nav__menu__options__option">
              <img src={cartIco} alt="cart" />
              <p>Ordenes</p>
            </Link>
            <Link
              id="usuarios__admin"
              to="/admin/users"
              className="nav__menu__options__option"
            >
              <img src={users} alt="settings" />
              <p>Usuarios</p>
            </Link>
          </div>
        )}
        {userInfo && userInfo.isSeller && (
          <div className="nav__menu__options">
            <strong className="admin__el__cacas">SELLER STUFF</strong>
            <Link to="/seller/dashboard" className="nav__menu__options__option">
              <img src={user} alt="user" />
              <p>Dashboard</p>
            </Link>
            <Link to="/seller/products" className="nav__menu__options__option">
              <img src={star} alt="star" />
              <p>Servicios</p>
            </Link>
            <Link to="/seller/orders" className="nav__menu__options__option">
              <img src={cartIco} alt="cart" />
              <p>Ordenes</p>
            </Link>
          </div>
        )}
      </div>
      <Link to="/" className="nav__logo">
        <img src={logo} alt="" />
      </Link>
      <Link to="/carrito" className="nav__cart">
        {cart.cartItems.lenght > 0 && (
          <span>{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</span>
        )}
        <img src={cartIco} alt="" />
      </Link>
    </nav>
  );
}
