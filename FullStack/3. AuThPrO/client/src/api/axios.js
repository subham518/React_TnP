import axios from "axios";

// One Axios instance used by every page.
// withCredentials: true makes the browser send the cookie with each request.
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export default api;
