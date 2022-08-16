import Desktop from "../Assets/Desktop-icon.png";
import Laptop from "../Assets/Laptop-icon.png";
import Phone from "../Assets/Phone-icon.png";
import Peripheral from "../Assets/Peripheral-icon.png";
import Component_icon from "../Assets/Component-icon.png";
import Apple from "../Assets/Apple-icon.png";
// import { getError } from '../utils';
// import axios from 'axios';
// import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { Store } from '../Store';


export default function Repair() {

  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { userInfo } = state;

  // const [categories, setCategories] = useState([]);
  // const [parts, setParts] = useState([]);

  // useEffect(() => {
  //   const fetchParts = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/products/parts`);
  //       setParts(data);
  //     } catch (err) {
        
  //     }
  //   };
  //   fetchParts();
  // }, []);

  return (
    <section className="home__repair">
      {/* <h2>¡Repara tus electrónicos!</h2>
      <div className="home__repair__items" >
      {categories.map((category) => (
          <Link to={`/search?category=${category}`} href="*" className="home__repair__items-item" >
          <img src={Desktop} alt="" />
          <p>{category}</p>
          </Link>
      ))}
        </div> */}
      <h2>¡Repara tus electrónicos!</h2>
      <div className="home__repair__items">
        <Link to={`/repara/pc`} href="*" className="home__repair__items-item" >
          <img src={Desktop} alt="" />
          <p>PC</p>
        </Link>
        <Link to={`/repara/laptop`} href="*" className="home__repair__items-item" >
          <img src={Laptop} alt="" />
          <p>Laptop</p>
        </Link>
        <Link to={`/repara/celulares`} href="*" className="home__repair__items-item" >
          <img src={Phone} alt="" />
          <p>Celular</p>
        </Link>
        <Link to={`/repara/lineablanca`} href="*" className="home__repair__items-item" >
          <img src={Peripheral} alt="" />
          <p>Periféricos</p>
        </Link>
        <Link to={`/repara/componentes`} href="*" className="home__repair__items-item" >
          <img src={Component_icon} alt="" />
          <p>Componentes</p>
        </Link>
        <Link to={`/repara/apple`} href="*" className="home__repair__items-item" >
          <img src={Apple} alt="" />
          <p>Apple</p>
        </Link>
      </div>
    </section>
  );
}
