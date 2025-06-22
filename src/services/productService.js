import axios from "../api/axios";

export const addProductRequest = (newProduct) => {
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

export const getAllProducts = async () => {
  return axios
    .get("/product/get-products")
    .then((response) => {
      let formattedProductList = [];
      for (let i in Object.keys(response.data)) {
        const formattedProduct = {
          id: response.data[i].id,
          title: response.data[i].name,
          description: response.data[i].description,
          numLeft: response.data[i].num_left,
        };
        formattedProductList.push(formattedProduct);
      }
      console.log(formattedProductList);
      return formattedProductList;
    })
    .catch((error) => {
      console.log("ERROR:", error);
    });
};

export const getProduct = async (id) => {
  return axios
    .get(`/product/${id}`)
    .then((response) => {
      const formattedResponse = {
        id: response.data.id,
        title: response.data.name,
        description: response.data.description,
        numLeft: response.data.num_left.toString(),
      };
      console.log("Getting a product's details...");
      console.log(formattedResponse);
      return formattedResponse;
    })
    .catch((error) => {
      console.log("ERROR:", error);
    });
};

export const updateProduct = (updatedProduct) => {
  console.log("Updating a product...");

  const formattedUpdatedProduct = {
    name: updatedProduct.title,
    description: updatedProduct.description,
    num_left: updatedProduct.numLeft,
  };

  const formData = new FormData();
  formData.append("payload", JSON.stringify(formattedUpdatedProduct));

  axios
    .put(`/product/update-product/${updatedProduct.id}`, formData)
    .then((response) => {
      console.log("RESPONSE:", response);
    })
    .catch((error) => {
      console.error("ERROR:", error);
    });
};
