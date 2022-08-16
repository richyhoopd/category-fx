import axios from "axios";
import { getError } from "../utils";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store.js";
import "../Styles/view__product.scss";
import Nav from "../Components/Nav";
import Check from "../Assets/Check-icon.svg";
import World from "../Assets/World-icon.svg";
import Clock from "../Assets/Clock-icon.svg";
import Shield from "../Assets/Shield-icon.svg";
import Avatar from "../Assets/Avatar.png";
import Star from "../Assets/Star-icon.svg";
import Swal from "sweetalert2";
import Footer from "../Components/Footer";

const reducer = (state, action) => {
  switch (action.type) {
    case "REFRESH_PRODUCT":
      return { ...state, product: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreateReview: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreateReview: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreateReview: false };
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  let reviewsRef = useRef();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      product: [],
      loading: true,
      error: "",
    });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigate("/carrito");
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      Swal.fire({
        icon: "error",
        text: "porfavor ingrese comentario y calificacion",
      });
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/products/${product._id}/reviews`,
        { rating, comment, name: userInfo.name },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({
        type: "CREATE_SUCCESS",
      });
      Swal.fire({
        icon: "success",
        text: "comentario emitido exitosamente",
      });
      product.reviews.unshift(data.review);
      product.numReviews = data.numReviews;
      product.rating = data.rating;
      dispatch({ type: "REFRESH_PRODUCT", payload: product });
      window.scrollTo({
        behavior: "smooth",
        top: reviewsRef.current.offsetTop,
      });
    } catch (error) {
      Swal.fire(
        {
          icon: "success",
          text: "comentario emitido",
        },
        getError(error)
      );
      dispatch({ type: "CREATE_FAIL" });
    }
  };
  return loading ? (
    <div>Cargando...</div>
  ) : error ? (
    <div>Error de carga...</div>
  ) : (
    <>
      <div className="view__product">
        <Nav />
        <div className="view__product__container">
          <div className="view__product__container__tittle">
            <h2>
              Reparacion {product.brand} {product.line} {product.model}{" "}
              {product.part}
            </h2>
            <div className="view__product__container__tittle-extra">
              <div className="view__product__container__tittle-extra-cal">
                <img src={Star} alt="" />
                <span>
                  {product.rating} Estrellas, {product.numReviews} Reseñas.{" "}
                </span>
              </div>
              <p>
                <img src={Check} alt="" /> Taller el abuelo
              </p>
            </div>
          </div>
          <div className="view__product__container__banner">
            <img alt={product.name} src={product.image} />
            <div className="view__product__container__banner-desc">
              <h3>{product.description}</h3>
              <h4>$ {product.price}</h4>
              <span>IVA incluido</span>
              {product.countInStock > 0 && (
                <button onClick={addToCartHandler}>Reparar ahora</button>
              )}
            </div>
          </div>
          <div className="view__product__container__benefits">
            <div className="view__product__container__benefits-item">
              <img src={Clock} alt="" />
              <span>Envio en 24H</span>
            </div>
            <div className="view__product__container__benefits-item">
              <img src={Shield} alt="" />
              <span>Garantia por 6 meses</span>
            </div>
            <div className="view__product__container__benefits-item">
              <img src={Check} alt="" />
              <span>Apoyo a los talleres locales</span>
            </div>
            <div className="view__product__container__benefits-item">
              <img src={World} alt="" />
              <span>Apoyo al medio ambiente</span>
            </div>
          </div>
          <div className="view__product__container__workshop">
            <h3>
              <img src={Check} alt="" />
              Taller el abuelo
            </h3>
            <p>Este taller esta certificado totalmente por nosotros.</p>
            <div className="view__product__container__workshop-img">
              {/*Aqui debe ir una imagen del taller */}
              <img src={product.image} alt="" />
            </div>
          </div>
          <div className="view__product__container__reviews">
            <h3>Reseñas</h3>
            {product.reviews.lenght === 0 && (
              <div>Aun no hay reseñas, añade una!</div>
            )}
            {product.reviews.map((review) => (
              <div className="view__product__container__reviews-review">
                <img src={Avatar} alt="" />
                <div className="view__product__container__reviews-review-text">
                  <h4>{review.name}</h4>
                  <div>{review.rating} Estrellas</div>
                  <p>{review.comment}</p>
                  <h6>{review.createdAt.substring(0, 10)}</h6>
                </div>
              </div>
            ))}
          </div>
          {userInfo ? (
            <form
              className="view__product__container__review"
              onSubmit={submitHandler}
            >
              <h3>Agrega un comentario</h3>
              <div className="view__product__container__review-cal">
                <label>Calificacion</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="" selected disabled>
                    Estrellas
                  </option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very good</option>
                  <option value="5">5 - Excelent</option>
                </select>
              </div>
              <div className="view__product__container__review-comment">
                <textarea
                  placeholder="Leave a comment here"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <button disabled={loadingCreateReview} type="submit">
                Enviar
              </button>
              {loadingCreateReview && <span>Publicando comentario...</span>}
            </form>
          ) : (
            <div className="view__product__container__review-login">
              <p>
                {" "}
                Porfavor{" "}
                <Link to={`/login?redirect=/product/${product.slug}`}>
                  ingrese a su cuenta
                </Link>{" "}
                para escribir una reseña{" "}
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductScreen;
