import logo from "../Assets/Logo-negro.svg";
import '../Styles/password__change.scss';

export default function PasswordChange (){

    return(
        <div className="password__change">
            <figure className="password__change__logo">
                <img src={logo} alt="logo" />
            </figure>
            <h2>Cambio de contraseña</h2>
            <p>Escribe tu nueva contraseña y confirmala</p>
            <form action="" className="password__change__form">
                <input type="password" placeholder="******" />
                <input type="password" placeholder="******" />
                <button>Terminar</button>
            </form>
            <div className="password__change__options">
                <a href="*">Regresar</a>
            </div>
        </div>
    )
}