import axios from "axios";
import * as productsController from "./productsController";

let initialState = {
  user: {},
  cart: [],
  products: [],
  loggedIn: false,
  total: 0
};

const LOGIN = "LOGIN";
const REGISTER = "REGISTER";
const GET_USER = "GET_USER";
const LOGOUT = "LOGOUT";
const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
const DELETE = "DELETE";
const CREATE_PRODUCT = "CREATE_PRODUCT";
// const CART_TOTAL = "CART_TOTAL";

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
  //console.log("triggered");
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
export const deleteProduct = id => {
  //console.log("fire1", id);
  return {
    type: DELETE,
    payload: axios.delete(`/admin/inventory/${id}`)
  };
};
export const create = () => {
  return {
    type: CREATE_PRODUCT,
    payload: axios.post("/admin/inventory")
  };
};
// export const cartTotal = () => {
//   //console.log("triggered");
//   return {
//     type: CART_TOTAL,
//     payload: total
//   };
// };

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
      //console.log("fire");
      return {
        ...state,
        isLoading: false,
        loggedIn: false
      };
    case `${GET_CART}_FULFILLED`:
      return { ...state, isLoading: false, cart: action.payload.data };
    case `${ADD_TO_CART}_FULFILLED`:
      console.log("fire1", action.payload.data[0].price);
      // const price = action.payload.data[0].price
      // const newTotal = state.total.reduce((total, price) => total + price, 0 )
      //const sum = state.total.reduce((partial_sum, a) => partial_sum + a);
      //console.log(sum);
      return {
        ...state,
        cart: [...state.cart, action.payload.data],
        total: (state.total += +action.payload.data[0].price)
      };
    case REMOVE_FROM_CART:
      let newArray = state.cart.slice();
      //FIXMENOTE; //deleting first item in array

      newArray.splice(action.payload, 1);

      return Object.assign({}, { cart: newArray });
    case `${GET_ALL_PRODUCTS}_PENDING`:
      return Object.assign({}, state, { loading: true });
    case `${GET_ALL_PRODUCTS}_FULFILLED`:
      //console.log("fire3", action.payload);
      return Object.assign({}, state, {
        loading: false,
        products: action.payload
      });
    case `${DELETE}_FULFILLED`:
      //console.log("fire2", action.payload.data);
      return Object.assign({}, state, {
        loading: false,
        products: action.payload.data
      });

    case `${CREATE_PRODUCT}_FULFILLED`:
      //console.log("fire2", action.payload.data);
      return Object.assign({}, state, {
        loading: false,
        products: action.payload
      });
    // case CART_TOTAL:

    // return Object.assign({}, state, { total: newArray });

    default:
      return state;
  }
}
