import axios from "../api/axios";

const addProductRequest = (newProduct) => {
  axios
    .post("/product/add-product", {
      name: newProduct.title,
      description: newProduct.description,
      num_left: newProduct.numLeft,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log("ERROR:", error);
    });
};

export default addProductRequest;
