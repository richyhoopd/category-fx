import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getError } from "../utils";
import { Store } from "../Store";
import "../Styles/product__list.scss";
import Nav from "../Components/Nav";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import Edit from "../Assets/Edit-icon-white.svg";
import Trash from "../Assets/Trash-icon-white.svg";
import Footer from "../Components/Footer";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loadingCreate: false,
      };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false, successDelete: false };

    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      return state;
  }
};

export default function ProductListScreen() {
  const [
    {
      loading,
      error,
      products,
      pages,
      loadingCreate,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get("page") || 1;

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/admin?page=${page} `, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {}
    };

    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete]);

  const createHandler = async () => {
    if (window.confirm("Estas seguro que quieres crear un nuevo servicio?")) {
      try {
        dispatch({ type: "CREATE_REQUEST" });
        const { data } = await axios.post(
          "/api/products",
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        Swal({
          text: "nice!",
        });
        dispatch({ type: "CREATE_SUCCESS" });
        navigate(`/admin/product/${data.product._id}`);
      } catch (err) {
        Swal(
          {
            text: "bad!",
          },
          getError(err)
        );
        dispatch({
          type: "CREATE_FAIL",
        });
      }
    }
  };

  const deleteHandler = async (product) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(`/api/products/${product._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        Swal.fire({
          icon: "success",
          text: "producto eliminado exitosamente",
        });
        dispatch({ type: "DELETE_SUCCESS" });
      } catch (err) {
        Swal.fire(
          {
            icon: "error",
            text: "producto con error al eliminar",
          },
          getError(err)
        );
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };

  return (
    <>
    <div className="product__list">
      <Helmet>
        <title>Servicios de chipsi</title>
      </Helmet>
      <Nav />
      {loading ? (
        <div>Cargando...</div>
      ) : error ? (
        <div variant="danger">{error}</div>
      ) : (
        <>
          <div className="product__list__container">
            <h2>Servicios</h2>

            <div className="product__list__container__table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th>LINE</th>
                    <th>MODEL</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>{product.line}</td>
                      <td>{product.model}</td>

                      <td>
                        <button
                          type="button"
                          variant="light"
                          onClick={() =>
                            navigate(`/admin/product/${product._id}`)
                          }
                        >
                          <img src={Edit} alt="" />
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          variant="light"
                          onClick={() => deleteHandler(product)}
                        >
                          <img src={Trash} alt="" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {loadingCreate && <div>creando producto...</div>}
              {loadingDelete && <div>Eliminando</div>}
            </div>
            <div className="product__list__container__page">
              <button
                style={{ cursor: "pointer" }}
                type="button"
                onClick={createHandler}
                className="product__list__container__page-add"
              >
                Crear nuevo servicio
              </button>
              <div className="caca">
                <span>Paginas:</span>
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === Number(page) ? "btn text-bold" : "btn"}
                    key={x + 1}
                    to={`/admin/products?page=${x + 1}`}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    <Footer />
    </>
  );
}
