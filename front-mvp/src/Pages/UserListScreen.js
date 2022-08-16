import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import { getError } from "../utils";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Nav from "../Components/Nav";
import '../Styles/user__list.scss';
import Trash from "../Assets/Trash-icon-white.svg";
import Footer from "../Components/Footer";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      return state;
  }
};
export default function UserListScreen() {
  const navigate = useNavigate();
  const [{ loading, error, users, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/users`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [userInfo, successDelete]);

  const deleteHandler = async (user) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        dispatch({ type: "DELETE_REQUEST" });
        await axios.delete(`/api/users/${user._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Usuario eliminado con exito",
          showConfirmButton: false,
          timer: 1500,
        });

        dispatch({ type: "DELETE_SUCCESS" });
      } catch (error) {
        Swal.fire(
          {
            position: "center",
            icon: "error",
            title: "el usuario no pudo eliminarse",
            showConfirmButton: false,
            timer: 1500,
          },
          getError(error)
        );
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };
  return (
    <>
    <div className="user__list">
      <Helmet>
        <title>Users</title>
      </Helmet>
      <Nav />
      <h2>Users</h2>
      {loadingDelete && <div>Cargando...</div>}
      {loading ? (
        <div>Cargando...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="user__list__table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>IS ADMIN</th>
                <th>IS SELLER</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "YES" : "NO"}</td>
                  <td>{user.isSeller ? "YES" : "NO"}</td>
                  <td>
                    <button
                      type="button"
                      variant="light"
                      onClick={() => navigate(`/admin/user/${user._id}`)}
                    >
                      Edit
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      variant="light"
                      onClick={() => deleteHandler(user)}
                    >
                      <img src={Trash} alt="" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
}
