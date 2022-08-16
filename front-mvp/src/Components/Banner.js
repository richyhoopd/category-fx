import Si from "../Assets/Si.svg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Banner() {
  const navigate = useNavigate();
  const [query] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : "/search");
  };
  return (
    <main className="home__main">
      <h1>
        Reduce a cero el riesgo de{" "}
        <b>
          reparar<span className="dot">.</span>
          <img className="Si" src={Si} alt="" />
        </b>
      </h1>
      {/*
      <h2>
        Repara tus dispositivos electronicos desde la palma de tu mano, sin
        salir de casa, sin dejarde trabajar, con un año de garantía.
      </h2>
  */}
      <form onSubmit={submitHandler}>
        <Link to="/repara">Repara ahora</Link>
        <a href="https://api.whatsapp.com/send?phone=5213325378780&text=%C2%A1Hola!%20Quisiera%20saber%20m%C3%A1s%20acerca%20de%20como%20reparar%20con%20chipsi.">
          <p>Cotiza por whatsapp</p>
        </a>
      </form>
    </main>
  );
}
