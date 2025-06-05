import axios from "../api/axios";

const addProductRequest = () => {
  axios
    .get("/fuck")
    .then((response) => {
      console.log("RESPONSE:", response);
      return response;
    })
    .catch((err) => console.log("ERROR:", err));
};

export default testRequest;
