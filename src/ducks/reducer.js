import axios from "axios";
import * as productsController from "./productsController";

let initialState = {
  user: {},
  cart: [],
  products: [],
  loggedIn: false
};

const LOGIN = "LOGIN";
const REGISTER = "REGISTER";
const GET_USER = "GET_USER";
const LOGOUT = "LOGOUT";
const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

export const register = (username, password) => {
  return {
    type: REGISTER,
    payload: axios.post("/auth/register", { username, password })
  };
};

export const login = (username, password) => {
  return {
    type: LOGIN,
    payload: axios.post("/auth/login", { username, password })
  };
};

export const getUser = () => {
  return {
    type: GET_USER,
    payload: axios.get("/auth/user")
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: axios.post("/auth/logout")
  };
};
export const getCart = () => {
  return {
    type: GET_CART,
    payload: axios.get("/inventory/cart")
  };
};
export const addToCart = id => {
  return {
    type: ADD_TO_CART,
    payload: axios.post("/inventory/addToCart", { id })
  };
};

export const removeFromCart = id => {
  console.log("triggered");
  return {
    type: REMOVE_FROM_CART,
    payload: id
  };
};
export const getAllProducts = () => {
  return {
    type: GET_ALL_PRODUCTS,
    payload: productsController.getAllProducts()
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${REGISTER}_PENDING`:
      return { ...state, isLoading: true };
    case `${REGISTER}_REJECTED`:
      return { ...state, isLoading: false, err: true };
    case `${REGISTER}_FULFILLED`:
      return { ...state, isLoading: false, user: action.payload.data };
    case `${LOGIN}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        loggedIn: true,
        user: action.payload.data
      };
    case `${GET_USER}_FULFILLED`:
      return { ...state, isLoading: false, user: action.payload.data };
    case `${LOGOUT}_FULFILLED`:
      console.log("fire");
      return {
        ...state,
        isLoading: false,
        loggedIn: false
      };
    case `${GET_CART}_FULFILLED`:
      return { ...state, isLoading: false, cart: action.payload.data };
    case `${ADD_TO_CART}_FULFILLED`:
      return {
        ...state,
        cart: [...state.cart, action.payload.data]
      };
    case REMOVE_FROM_CART:
      console.log("cart:", state.cart);
      console.log("trigger");
      let newArray = state.cart.slice();
      //FIXMENOTE; //deleting first item in array

      newArray.splice(action.payload, 1);

      return Object.assign({}, { cart: newArray });
    case `${GET_ALL_PRODUCTS}_PENDING`:
      return Object.assign({}, state, { loading: true });
    case `${GET_ALL_PRODUCTS}_FULFILLED`:
      return Object.assign({}, state, {
        loading: false,
        products: action.payload
      });

    default:
      return state;
  }
}
