import axios from "axios";

export const getAllProducts = function() {
  return axios.get("/inventory/products").then(response => response.data);
};
//http://localhost:5050
