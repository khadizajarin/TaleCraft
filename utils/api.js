import axios from "axios";

const API = axios.create({
  //baseURL: "http://localhost:5000/", 
  baseURL: "https://server-talecraft.vercel.app/", 
  headers: { "Content-Type": "application/json" },
});

export default API;
