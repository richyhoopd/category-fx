import "../Styles/home.scss";
import Nav from "../Components/Nav.js";
import Repair from "../Components/Repair";
import Banner from "../Components/Banner";
import Join from "../Components/Join";
import { Helmet } from "react-helmet-async";
import { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import PopularItem from "../Components/PopularItem";
import Footer from "../Components/Footer";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function Home() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div className="home">
      <Helmet>
        <title>Chipsi</title>
      </Helmet>
      <Nav />
      <Banner />
      <Repair />

      <div id="section__products">
        <h3>Reparacion de pantallas</h3>
        {loading ? (
          <div>Cargando...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <section className="home__popular">
            {products.map((product) => (
              <PopularItem product={product}></PopularItem>
            ))}
          </section>
        )}
      </div>
      <div className="home__button">
        <button>¡Repara en 3 pasos!</button>
      </div>
      <Join />
      <Footer />
    </div>
  );
}
