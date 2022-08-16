import "../Styles/register.scss";
import logo from "../Assets/Logo-negro.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import {Store} from "../Store";
import Axios from 'axios';
import Swal from 'sweetalert2';


export default function Register() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state; 

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden',
        confirmButtonColor: '#14cc98',
      })
      return;
    }
    try {
      const { data } = await Axios.post('api/users/registro', {
        name,
        email,
        password,
        confirmPassword
      });
      ctxDispatch({type: 'USER_SIGNIN', payload: data})
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Correo electronico o contraseña incorrectos :(',
        footer: '<a href="/register">Crear una cuenta?</a>',
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
    <div className="register">
      <figure className="register__logo">
        <img src={logo} alt="logo" />
      </figure>
      <h2>Bienvenido</h2>
      <p>Al registrarte aceptas todos los <a href="*">Términos y condiciones</a></p>
      <form onSubmit={submitHandler} className="register__form">
        <input type="name" placeholder="Nombre" onChange={(e) => setName(e.target.value)} required/>
        <input type="email" placeholder="ejemplo@email.com" onChange={(e) => setEmail(e.target.value)} required/>
        <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required/>
        <input type="password" placeholder="Confirma contraseña" onChange={(e) => setConfirmPassword(e.target.value)} required/>
        <button type="submit">Crear cuenta</button>
      </form>
      <div className="register__options">
        <a href="*">Crear cuenta para negocio</a>
        <a href="/login">Ya tengo una cuenta</a>
      </div>
    </div>
  );
}
