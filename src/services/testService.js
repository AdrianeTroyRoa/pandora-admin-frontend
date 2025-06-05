import axios from "../api/axios";

const testRequest = () => {
  axios
    .get("/fuck")
    .then((response) => console.log("RESPONSE:", response))
    .catch((err) => console.log("ERROR:", err));
};

export default testRequest;
