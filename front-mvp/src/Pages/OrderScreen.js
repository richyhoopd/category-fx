import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store";
import "../Styles/tracking.scss";
import Nav from "../Components/Nav.js";
import { getError } from "../utils";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import Footer from "../Components/Footer";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false };
    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false };
    case "DELIVER_RESET":
    case "PICK_REQUEST":
      return { ...state, loadingPick: true };
    case "PICK_SUCCESS":
      return { ...state, loadingPick: false, successPick: true };
    case "PICK_FAIL":
      return { ...state, loadingPick: false };
    case "PICK_RESET":
    case "FIXING_REQUEST":
      return { ...state, loadingFix: true };
    case "FIXING_SUCCESS":
      return { ...state, loadingFix: false, successFix: true };
    case "FIXING_FAIL":
      return { ...state, loadingFix: false };
    case "FIXING_RESET":
    case "WAYBACK_REQUEST":
      return { ...state, loadingWayback: true };
    case "WAYBACK_SUCCESS":
      return { ...state, loadingWayback: false, successWayback: true };
    case "WAYBACK_FAIL":
      return { ...state, loadingWayback: false };
    case "WAYBACK_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
        loadingPick: false,
        successPick: false,
        loadingFix: false,
        successFix: false,
        loadingWayback: false,
        successWayback: false,
      };

    default:
      return state;
  }
}

export default function OrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
      loadingPick,
      successPick,
      loadingFix,
      successFix,
      loadingWayback,
      successWayback,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
    successPay: false,
    loadingPay: false,
    loadingPick: false,
    successPick: false,
    loadingFix: false,
    successFix: false,
    loadingWayback: false,
    successWayback: false,
  });

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Gracias, Tu pago se aprobo!",
          text: "Pronto nos pondremos en contacto para organizar la recogida y entrega de tu dispositivo!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: getError(err) });
        Swal.fire({
          icon: "error",
          title: "Error en el pago",
          text: "Revisa tu metodo de pago, verifica los datos!",
          footer: '<a href="">Por que tengo este error?</a>',
        });
      }
    });
  }
  function onError(err) {
    Swal.fire({
      icon: "error",
      title: "Error en el pago",
      text: "Revisa tu metodo de pago, verifica los datos!",
      footer: '<a href="">Por que tengo este error?</a>',
    });
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate("/login");
    }
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
      if (successPick) {
        dispatch({ type: "PICK_RESET" });
      }
      if (successFix) {
        dispatch({ type: "FIXING_RESET" });
      }
      if (successWayback) {
        dispatch({ type: "WAYBACK_RESET" });
      }
      if (successDeliver) {
        dispatch({ type: "DELIVER_RESET" });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal", {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPaypalScript();
    }
  }, [
    order,
    userInfo,
    orderId,
    navigate,
    paypalDispatch,
    successPay,
    successDeliver,
    successPick,
    successFix,
    successWayback,
  ]);

  async function pickOrderHandler() {
    try {
      dispatch({ type: "PICK_REQUEST" });
      const { data } = await axios.put(
        `/api/orders/${order._id}/picked`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "PICK_SUCCESS", payload: data });
      Swal.fire({
        icon: "success",
        text: "Orden Recogida con exito",
        position: "center",
      });
    } catch (err) {
      Swal.fire(
        {
          icon: "error",
          text: "Hubo un problema recogiendo la orden",
          position: "center",
        },
        getError(err)
      );
      dispatch({ type: "PICK_FAIL" });
    }
  }

  async function fixOrderHandler() {
    try {
      dispatch({ type: "FIXING_REQUEST" });
      const { data } = await axios.put(
        `/api/orders/${order._id}/beingfixed`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "FIXING_SUCCESS", payload: data });
      Swal.fire({
        icon: "success",
        text: "Orden Recogida con exito",
        position: "center",
      });
    } catch (err) {
      Swal.fire(
        {
          icon: "error",
          text: "Hubo un problema recogiendo la orden",
          position: "center",
        },
        getError(err)
      );
      dispatch({ type: "FIXING_FAIL" });
    }
  }

  async function waybackOrderHandler() {
    try {
      dispatch({ type: "WAYBACK_REQUEST" });
      const { data } = await axios.put(
        `/api/orders/${order._id}/wayback`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "WAYBACK_SUCCESS", payload: data });
      Swal.fire({
        icon: "success",
        text: "La orden fue marcada como de regreso",
        position: "center",
      });
    } catch (err) {
      Swal.fire(
        {
          icon: "error",
          text: "hubo un problema con la orden",
          position: "center",
        },
        getError(err)
      );
      dispatch({ type: "WAYBACK_FAIL" });
    }
  }

  async function deliverOrderHandler() {
    try {
      dispatch({ type: "DELIVER_REQUEST" });
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "DELIVER_SUCCESS", payload: data });
      Swal.fire({
        icon: "success",
        text: "Orden entregada con exito",
        position: "center",
      });
    } catch (err) {
      Swal.fire(
        {
          icon: "error",
          text: "Hubo un problema",
          position: "center",
        },
        getError(err)
      );
      dispatch({ type: "DELIVER_FAIL" });
    }
  }
  return loading ? (
    <div>Cargando...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <>
      <div className="tracking">
        <Helmet>Rastreo del pedido: {orderId}</Helmet>
        <Nav />
        <h2 className="lolgrande">
          {order.shippingAddress.fullName}, {order.shippingAddress.address},{" "}
          {order.shippingAddress.city}, {order.shippingAddress.cp},{" "}
          {order.shippingAddress.country}
        </h2>
        <span className="lolspan">ch-{orderId}</span>
        <center>
          <div className="tracking__method">
            <p>Pago {order.paymentMethod}</p>
          </div>
          {!order.isPaid && order.paymentMethod === "Cash" && (
            <div>
              {isPending ? (
                <div />
              ) : (
                <p className="add__text">Prepara la cantidad en efectivo justa por favor.</p>
              )}
              {loadingPay && <div></div>}
            </div>
          )}

          {!order.isPaid && order.paymentMethod === "Card" && (
            <div>
              {isPending ? (
                <div />
              ) : (
                <div>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                </div>
              )}
              {loadingPay && <div></div>}
            </div>
          )}

          {!order.isPaid && order.paymentMethod === "PayPal" && (
            <div>
              {isPending ? (
                <div />
              ) : (
                <div>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                </div>
              )}
              {loadingPay && <div></div>}
            </div>
          )}

          {userInfo.isAdmin &&
            order.isPaid &&
            !order.isPicked &&
            !order.isBeingFixed &&
            !order.isOnItsWayBack &&
            !order.isDelivered && (
              <div className="button__tracking">
                {loadingPick && <div></div>}
                <button onClick={pickOrderHandler}>
                  Marcar orden como recogida
                </button>
              </div>
            )}
          {userInfo.isAdmin &&
            order.isPaid &&
            order.isPicked &&
            !order.isBeingFixed &&
            !order.isOnItsWayBack &&
            !order.isDelivered && (
              <div className="button__tracking">
                {loadingFix && <div></div>}
                <button onClick={fixOrderHandler}>
                  Marcar orden como en proceso de reparacion
                </button>
              </div>
            )}
          {userInfo.isAdmin &&
            order.isPaid &&
            order.isPicked &&
            order.isBeingFixed &&
            !order.isOnItsWayBack &&
            !order.isDelivered && (
              <div className="button__tracking">
                {loadingWayback && <div></div>}
                <button onClick={waybackOrderHandler}>
                  Marcar la orden como regreando a casa
                </button>
              </div>
            )}
          {userInfo.isAdmin &&
            order.isPaid &&
            order.isPicked &&
            order.isBeingFixed &&
            order.isOnItsWayBack &&
            !order.isDelivered && (
              <div className="button__tracking">
                {loadingDeliver && <div></div>}
                <button  onClick={deliverOrderHandler}>
                  Marcar orden como entregada
                </button>
              </div>
            )}
          <div>
            {order.isPaid ? (
              <div></div>
            ) : (
              <div id="wait">
                <h3>Falta de pago</h3>
                <p>favor de efectuar su pago en {order.paymentMethod}</p>
              </div>
            )}
          </div>
        </center>

        <div className="tracking__steps">
          <div className="tracking__steps-step">
            {order.isPaid ? (
              <div>
                <span className="step__ready">A</span>
                <span className="progress progress__ready"></span>
              </div>
            ) : (
              <span>A</span>
            )}
            <div className="tracking__steps-step-text">
              <h3>En camino</h3>
              <p>El repartido recogera tu dispositivo</p>
            </div>
          </div>
          <div className="tracking__steps-step">
            {order.isPicked ? (
              <div>
                <span className="step__ready">B</span>
                <span className="progress progress__ready"></span>
              </div>
            ) : (
              <span>B</span>
            )}
            <div className="tracking__steps-step-text">
              <h3>Tu casa</h3>
              <p>Repartidor fuera de tu casa</p>
            </div>
          </div>
          <div className="tracking__steps-step">
            {order.isBeingFixed ? (
              <div>
                <span className="step__ready">C</span>
                <span className="progress progress__ready"></span>
              </div>
            ) : (
              <span>C</span>
            )}
            <div className="tracking__steps-step-text">
              <h3>Taller</h3>
              <p>El dispositivo esta siendo reparado</p>
            </div>
          </div>
          <div className="tracking__steps-step">
            {order.isOnItsWayBack ? (
              <div>
                <span className="step__ready">D</span>
                <span className="progress progress__ready"></span>
              </div>
            ) : (
              <span>D</span>
            )}
            <div className="tracking__steps-step-text">
              <h3>En camino de regreso</h3>
              <p>Tu dispositivo esta en camino de regreso</p>
            </div>
          </div>
          <div className="tracking__steps-step">
            {order.isDelivered ? (
              <div>
                <span className="step__ready">E</span>
              </div>
            ) : (
              <span>E</span>
            )}
            <div className="tracking__steps-step-text">
              <h3>Tu casa</h3>
              <p>El dispositivo de vuelta a tus manos</p>
            </div>
          </div>
        </div>
        <div className="tracking__buttons">
          <button>Contactar al reparador</button>
          <button>Contactar al repartidor</button>
        </div>
      </div>
      <Footer />
    </>
  );
}
