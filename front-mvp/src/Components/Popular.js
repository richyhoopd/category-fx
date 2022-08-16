// // import data from "../data";
// import axios from "axios";
// import { useContext } from "react";
// import { Store } from "../Store";

// export default function Popular(props) {
//   const { product } = props;

//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const {
//     cart: { cartItems },
//   } = state;

//   const addToCartHandler = async (item) => {
//     const existItem = cartItems.find((x) => x._id === product._id);
//     const quantity = existItem ? existItem.quantity + 1 : 1;
//     const { data } = await axios.get(`/api/products/${item._id}`);
//     if (data.countInStock < quantity) {
//       window.alert("Sorry. Product is out of stock");
//       return;
//     }
//     ctxDispatch({
//       type: "CART_ADD_ITEM",
//       payload: { ...item, quantity },
//     });
//   };

//   return (
//     <section className="home__popular">
//     </section>
//   );
// }
