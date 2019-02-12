import axios from "axios";

let initialState = {
  user: {},
  cart: []
};

const LOGIN = "LOGIN";
const REGISTER = "REGISTER";
const GET_USER = "GET_USER";
const LOGOUT = "LOGOUT";
const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";

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
export const addToCart = () => {
  return {
    type: ADD_TO_CART,
    payload: axios.post("/inventory/addToCart")
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
      return { ...state, isLoading: false, user: action.payload.data };
    case `${GET_USER}_FULFILLED`:
      return { ...state, isLoading: false, user: action.payload.data };
    case `${LOGOUT}_FULFILLED`:
      return { ...state, isLoading: false, user: action.payload.data };
    case `${GET_CART}_FULFILLED`:
      return { ...state, isLoading: false, user: action.payload.data };
    case `${ADD_TO_CART}_FULFILLED`:
      return { ...state, isLoading: false, user: action.payload.data };

    default:
      return state;
  }
}
