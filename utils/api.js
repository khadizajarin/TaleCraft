import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/", // ✅ Set your API base URL
  headers: { "Content-Type": "application/json" },
});

export default API;
