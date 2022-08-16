import logo from '../Assets/Logo-negro.svg';
import '../Styles/password__change__email.scss';

export default function PassowrdChangeEmail(){

    return(
        <div className='password__change__email'>
            <figure className='password__change__email__logo'>
                <img src={logo} alt="" />
            </figure>
            <h2>Escribe tu email</h2>
            <p>Te enviaremos un correo para comprobar que eres tú</p>
            <form action="" className='password__change__email__form'>
                <input type="email" placeholder='Ejemplo@email.com' />
                <button>Enviar</button>
            </form>
            <div className='password__change__email__options'>
                <a href="*">Regresar</a>
            </div>
        </div>
    )
}