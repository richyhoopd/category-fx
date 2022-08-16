import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store";
import { getError } from "../utils";
import Swal from "sweetalert2";
import Nav from "../Components/Nav";
import "../Styles/user__edit.scss";
import Footer from "../Components/Footer";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

export default function UserEditScreen() {
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: userId } = params;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
        setIsSeller(data.isSeller);
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userId, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/users/${userId}`,
        { _id: userId, name, email, isAdmin, isSeller },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usuario actualizado exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/admin/users");
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "El usuario no pudo ser actualizado :(",
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch({ type: "UPDATE_FAIL" });
    }
  };
  return (
    <>
      <div className="user__edit">
        <Helmet>
          <title>Edit User ${userId}</title>
        </Helmet>
        <Nav />
        <h2>Edit User {userId}</h2>

        {loading ? (
          <div>Cargando...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <form className="user__edit__form" onSubmit={submitHandler}>
            <div className="user__edit__form-input" controlId="name">
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="user__edit__form-input" controlId="email">
              <label>Email</label>
              <input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="user__edit__form-input shitmotherfucker">
              <input
                type="checkbox"
                id="isAdmin"
                label="isAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <label id="label__isAdmin" htmlFor="isAdmin">
                Admin:
              </label>
              <span id="isAdminSi">Si</span>
              <span id="isAdminNo">No</span>
            </div>
            <div className="user__edit__form-input shitmotherfucker">
              <input
                type="checkbox"
                id="isSeller"
                label="isSeller"
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.checked)}
              />
              <label id="label__isSeller" htmlFor="isSeller">
                Taller:
              </label>
              <span id="isSellerSi">Si</span>
              <span id="isSellerNo">No</span>
            </div>

            <button disabled={loadingUpdate} type="submit">
              Update
            </button>
            {loadingUpdate && <div>Cargando...</div>}
          </form>
        )}
      </div>
      <Footer />
    </>
  );
}
