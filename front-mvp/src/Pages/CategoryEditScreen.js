// import React, { useContext, useEffect, useReducer, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { Store } from "../Store";
// import { getError } from "../utils";
// import { Helmet } from "react-helmet-async";
// import Swal from "sweetalert2";
// import Nav from "../Components/Nav";
// import "../Styles/product__edit.scss";
// import Trash from "../Assets/Trash-icon-white.svg";
// import Footer from "../Components/Footer";

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "FETCH_REQUEST":
//       return { ...state, loading: true };
//     case "FETCH_SUCCESS":
//       return { ...state, loading: false };
//     case "FETCH_FAIL":
//       return { ...state, loading: false, error: action.payload };
//     case "UPDATE_REQUEST":
//       return { ...state, loadingCreate: true };
//     case "UPDATE_SUCCESS":
//       return { ...state, loadingCreate: false };
//     case "UPDATE_FAIL":
//       return { ...state, loadingCreate: false };
//     case "UPLOAD_REQUEST":
//       return { ...state, loadingUpload: true, errorUpload: "" };
//     case "UPLOAD_SUCCESS":
//       return {
//         ...state,
//         loadingUpload: false,
//         errorUpload: "",
//       };
//     case "UPLOAD_FAIL":
//       return { ...state, loadingUpload: false, errorUpload: action.payload };

//     default:
//       return state;
//   }
// };
// export default function CategoryCreateScreen() {
//   const navigate = useNavigate();
//   const params = useParams(); // /product/:id
//   const { id: categoryId } = params;

//   const { state } = useContext(Store);
//   const { userInfo } = state;
//   const [{ loading, error, loadingCreate, loadingUpload }, dispatch] =
//     useReducer(reducer, {
//       loading: true,
//       error: "",
//     });

//   const [name, setName] = useState("");
//   const [image, setImage] = useState("");
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         dispatch({ type: "FETCH_REQUEST" });
//         const { data } = await axios.get(`/api/categories/${categoryId}`);
//         setName(data.name);
//         setImage(data.image);
//         dispatch({ type: "FETCH_SUCCESS" });
//       } catch (err) {
//         dispatch({
//           type: "FETCH_FAIL",
//           payload: getError(err),
//         });
//       }
//     };
//     fetchData();
//   }, [categoryId]);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch({ type: "UPDATE_REQUEST" });
//       await axios.put(
//         `/api/categories/${categoryId}`,
//         {
//           _id: categoryId,
//           name,
//           image,
//         },
//         {
//           headers: { Authorization: `Bearer ${userInfo.token}` },
//         }
//       );
//       dispatch({
//         type: "UPDATE_SUCCESS",
//       });
//       Swal.fire({
//         icon: "success",
//         text: "Categoria creada con exito con exito",
//       });
//       navigate("/admin/categories");
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         text: "la categoria no fue creada",
//       });
//       dispatch({ type: "UPDATE_FAIL" });
//     }
//   };
//   const uploadFileHandler = async (e, forImages) => {
//     const file = e.target.files[0];
//     const bodyFormData = new FormData();
//     bodyFormData.append("file", file);
//     try {
//       dispatch({ type: "UPLOAD_REQUEST" });
//       const { data } = await axios.post("/api/upload", bodyFormData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           authorization: `Bearer ${userInfo.token}`,
//         },
//       });
//       dispatch({ type: "UPLOAD_SUCCESS" });

//         setImage(data.secure_url);
    
//       Swal.fire({
//         icon: "success",
//         text: "imagen cargada exitosamente, click en actualizar para guardar cambios",
//       });
//     } catch (err) {
//       Swal.fire(
//         {
//           icon: "error",
//           text: "las imagenes no pudieron cargarse",
//         },
//         getError(err)
//       );
//       dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
//     }
//   };
//   const deleteFileHandler = async (fileName, f) => {
//     console.log(fileName, f);
//     Swal.fire({
//       icon: "success",
//       text: "la imagen se elimino con exito",
//     });
//   };

//   return (
//     <>
//     <div className="product__edit">
//       <Helmet>Editar categoria ${categoryId}</Helmet>
//       <Nav />
//       <div>
//         <h2>Editar producto ${categoryId}</h2>
//       </div>
//       {loading ? (
//         <div>Cargando...</div>
//       ) : error ? (
//         <div>{error}</div>
//       ) : (
//         <form className="product__edit__form" onSubmit={submitHandler}>
//           <div className="product__edit__form-input">
//             <label>nombre</label>
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
          
         
//           <div className="product__edit__form-input">
//             <label>Image File</label>
//             <input
//               value={image}
//               onChange={(e) => setImage(e.target.value)}
//               required
//             />
//           </div>
         
//           <div className="product__edit__form-input">
//             <label id="label__img" htmlFor="image">Upload Image</label>
//             <input id="image" type="file" onChange={uploadFileHandler} />
//             {loadingUpload && <div>cargando...</div>}
//           </div>
//           <div className="product__edit__form-input">
//             <label id="label__img" htmlFor="image__extra">Upload Aditional Image</label>
//             <input id="image__extra" type="file" onChange={(e) => uploadFileHandler(e, true)} />
//             {loadingUpload && <div>cargando...</div>}
//           </div>
//           <div className="imagen__text">
//             <label className="popo">Additional Images</label>
//             {image.length === 0 && <span>No image</span>}
//               {image.map((x) => (
//                 <div key={x}>
//                   <span>{x}</span>
//                   <button onClick={() => deleteFileHandler(x)}>
//                     <img src={Trash} alt="" />
//                   </button>
//                 </div>
//               ))}
//           </div>
//           <button className="button__actualizar" type="submit" disabled={loadingCreate}>
//             actualizar
//           </button>
//           {loadingCreate && <div>cargando...</div>}
//         </form>
//       )}
//     </div>
//     <Footer />
//     </>
//   );
// }