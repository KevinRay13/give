import axios from "axios";

export const getAllProducts = function() {
  return axios
    .get("http://localhost:5050/inventory/products")
    .then(response => response.data);
};
