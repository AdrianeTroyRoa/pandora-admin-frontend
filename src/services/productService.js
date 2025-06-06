import axios from "../api/axios";

const addProductRequest = (newProduct) => {
  const formattedNewProduct = {
    name: newProduct.title,
    description: newProduct.description,
    num_left: newProduct.numLeft,
  };

  const formData = new FormData();
  formData.append("file", newProduct.image);
  formData.append("payload", JSON.stringify(formattedNewProduct));
  axios
    .post("/product/add-product", formData)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log("ERROR:", error);
    });
};

export default addProductRequest;
