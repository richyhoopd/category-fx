import React, { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";
import PopularItem from "../Components/PopularItem";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import Nav from "../Components/Nav";
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
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];

export const ratings = [
  {
    name: "4stars & up",
    rating: 4,
  },

  {
    name: "3stars & up",
    rating: 3,
  },

  {
    name: "2stars & up",
    rating: 2,
  },

  {
    name: "1stars & up",
    rating: 1,
  },
];

export default function SearchScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get("category") || "all";
  const brand = sp.get("brand") || "all";
  const line = sp.get("line") || "all";
  const model = sp.get("model") || "all";
  const part = sp.get("part") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "newest";
  const page = sp.get("page") || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&brand=${brand}&line=${line}&model=${model}&part=${part}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, brand, line, model, part, error, order, page, price, query, rating]);

  const [categories, setCategories] = useState([]);
  // const [brands, setBrands] = useState([]);
  // const [models, setModels] = useState([]);
  // const [lines, setLines] = useState([]);
  // const [parts, setParts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
        
      } catch (err) {}
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterBrand = filter.brand || brand;
    const filterLine = filter.line || line;
    const filterModel = filter.model || model;
    const filterPart = filter.part || part;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?category=${filterCategory}&brand=${filterBrand}&line=${filterLine}&model=${filterModel}&part=${filterPart}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };
  return (
    <>
    <div className="search">
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Nav />
      <div className="search__contanier">
        <h3>Department</h3>
        <div className="search__container__filters">
          <div className="search__container__filters-item">
            <ul>
              <li>
                <Link
                  className={"all" === category ? "text-bold" : ""}
                  to={getFilterUrl({ category: "all" })}
                >
                  Any
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    className={c === category ? "text-bold" : ""}
                    to={getFilterUrl({ category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* <h3>Marcas</h3>
          <div className="search__container__filters-item">
            <ul>
              <li>
                <Link
                  className={"all" === brand ? "text-bold" : ""}
                  to={getFilterUrl({ brand: "all" })}
                >
                  Todas
                </Link>
              </li>
              {brands.map((b) => (
                <li key={b}>
                  <Link
                    className={b === brand ? "text-bold" : ""}
                    to={getFilterUrl({ brand: b })}
                  >
                    {b}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
          
          <div className="search__container__filters-item">
            <h3>Price</h3>
            <ul>
              <li>
                <Link
                  className={"all" === price ? "text-bold" : ""}
                  to={getFilterUrl({ price: "all" })}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    to={getFilterUrl({ price: p.value })}
                    className={p.value === price ? "text-bold" : ""}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="search__container__filters-item">
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? "text-bold" : ""}
                  ></Link>
                </li>
              ))}
              <li>
                <Link
                  to={getFilterUrl({ rating: "all" })}
                  className={rating === "all" ? "text-bold" : ""}
                ></Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="search__container__products">
          {loading ? (
            <span>cargando...</span>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <>
              <div className="justify-content-between mb-3">
                <div md={6}>
                  <div>
                    {countProducts === 0 ? "No" : countProducts} Results
                    {query !== "all" && " : " + query}
                    {category !== "all" && " : " + category}
                    {price !== "all" && " : Price " + price}
                    {rating !== "all" && " : Rating " + rating + " & up"}
                    {query !== "all" ||
                    category !== "all" ||
                    rating !== "all" ||
                    price !== "all" ? (
                      <button
                        variant="light"
                        onClick={() => navigate("/search")}
                      >
                        <i className="fas fa-times-circle"></i>
                      </button>
                    ) : null}
                  </div>
                </div>
                <div className="text-end">
                  Sort by{" "}
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Avg. Customer Reviews</option>
                  </select>
                </div>
              </div>
              {products.length === 0 && <div>No Product Found</div>}

              <div>
                {products.map((product) => (
                  <div sm={6} lg={4} className="mb-3" key={product._id}>
                    <PopularItem product={product}></PopularItem>
                  </div>
                ))}
              </div>

              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    <button
                      className={Number(page) === x + 1 ? "text-bold" : ""}
                      variant="light"
                    >
                      {x + 1}
                    </button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
