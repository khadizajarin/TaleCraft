import axios from "axios";

const API = axios.create({
  baseURL: "https://server-talecraft.vercel.app/", // ✅ Set your API base URL
  headers: { "Content-Type": "application/json" },
});

export default API;
