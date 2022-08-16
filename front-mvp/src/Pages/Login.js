import "../Styles/login.scss";
import logo from "../Assets/Logo-negro.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { Store } from '../Store';
import Swal from 'sweetalert2'



export default function Login() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state; 

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('api/users/signin', {
        email,
        password,
      });
      ctxDispatch({type: 'USER_SIGNIN', payload: data})
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Correo electronico o contraseña incorrectos :(',
        footer: '<a href="/registro">Crear una cuenta?</a>',
        confirmButtonColor: '#14cc98',
      })
      
      
    }
  }

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    
    <div className="login">
      <figure className="login__logo">
        <img src={logo} alt="logo" />
      </figure>
      <h2>Inicio de sesión</h2>
      <p>¡Hola de nuevo!</p>
      <form onSubmit={submitHandler} className="login__form">
        <input type="email" placeholder="ejemplo@email.com" required onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="******" required onChange={(e) => setPassword(e.target.value)}/>
        <button>Iniciar sesión</button>
      </form>
      <div className="login__options">
        <a href="/forgot">Olvide mi contraseña</a>
        <Link to={`/registro?redirect=${redirect}`}>Crear cuenta</Link>
      </div>
    </div>
  );
}
