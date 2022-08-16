import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import Nav from "../Components/Nav";
import "../Styles/product__edit.scss";
import Trash from "../Assets/Trash-icon-white.svg";
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
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};
export default function ProductEditScreen() {
  const navigate = useNavigate();
  const params = useParams(); // /product/:id
  const { id: productId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [model, setModel] = useState("");
  const [line, setLine] = useState("");
  const [part, setPart] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setSlug(data.slug);
        setPrice(data.price);
        setImage(data.image);
        setImages(data.images);
        setCategory(data.category);
        setModel(data.model);
        setLine(data.line);
        setPart(data.part);
        setCountInStock(data.countInStock);
        setBrand(data.brand);
        setDescription(data.description);
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          name,
          slug,
          price,
          image,
          images,
          category,
          brand,
          line,
          model,
          part,
          countInStock,
          description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      Swal.fire({
        icon: "success",
        text: "producto actualizado con exito",
      });
      navigate("/admin/products");
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "el producto no fue actualizado",
      });
      dispatch({ type: "UPDATE_FAIL" });
    }
  };
  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post("/api/upload", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: "UPLOAD_SUCCESS" });

      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      Swal.fire({
        icon: "success",
        text: "imagen cargada exitosamente, click en actualizar para guardar cambios",
      });
    } catch (err) {
      Swal.fire(
        {
          icon: "error",
          text: "las imagenes no pudieron cargarse",
        },
        getError(err)
      );
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
    }
  };
  const deleteFileHandler = async (fileName, f) => {
    console.log(fileName, f);
    console.log(images);
    console.log(images.filter((x) => x !== fileName));
    setImages(images.filter((x) => x !== fileName));
    Swal.fire({
      icon: "success",
      text: "la imagen se elimino con exito",
    });
  };

  return (
    <>
    <div className="product__edit">
      <Helmet>Editar producto ${productId}</Helmet>
      <Nav />
      <div>
        <h2>Editar producto ${productId}</h2>
      </div>
      {loading ? (
        <div>Cargando...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <form className="product__edit__form" onSubmit={submitHandler}>
          <div className="product__edit__form-input">
            <label>nombre</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="product__edit__form-input">
            <label>slug</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>
          <div className="product__edit__form-input">
            <label>precio</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="product__edit__form-input">
            <label>Image File</label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <div className="product__edit__form-input">
            <label>categoria</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="product__edit__form-input">
            <label>marca</label>
            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>
          <div className="product__edit__form-input">
            <label> modelo </label>
            <input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>
          <div className="product__edit__form-input">
            <label>linea</label>
            <input
              value={line}
              onChange={(e) => setLine(e.target.value)}
              required
            />
          </div>
          <div className="product__edit__form-input">
            <label>Parte a reparar</label>
            <input
              value={part}
              onChange={(e) => setPart(e.target.value)}
              required
            />
          </div>
          <div className="product__edit__form-input">
            <label>disponibilidad</label>
            <input
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              required
            />
          </div>
          <div className="product__edit__form-input">
            <label>descripcion </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="product__edit__form-input">
            <label id="label__img" htmlFor="image">Upload Image</label>
            <input id="image" type="file" onChange={uploadFileHandler} />
            {loadingUpload && <div>cargando...</div>}
          </div>
          <div className="product__edit__form-input">
            <label id="label__img" htmlFor="image__extra">Upload Aditional Image</label>
            <input id="image__extra" type="file" onChange={(e) => uploadFileHandler(e, true)} />
            {loadingUpload && <div>cargando...</div>}
          </div>
          <div className="imagen__text">
            <label className="popo">Additional Images</label>
            {images.length === 0 && <span>No image</span>}
              {images.map((x) => (
                <div key={x}>
                  <span>{x}</span>
                  <button onClick={() => deleteFileHandler(x)}>
                    <img src={Trash} alt="" />
                  </button>
                </div>
              ))}
          </div>
          <button className="button__actualizar" type="submit" disabled={loadingUpdate}>
            actualizar
          </button>
          {loadingUpdate && <div>cargando...</div>}
        </form>
      )}
    </div>
    <Footer />
    </>
  );
}