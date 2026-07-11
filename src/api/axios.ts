// import axios from "axios";



// const baseURL =
//   import.meta.env.VITE_API_URL || "http://localhost:5000";



// const api = axios.create({
//   baseURL,
//   withCredentials: true,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers = config.headers || {};
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default api;


import axios from "axios";



const baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

if (!baseURL) {
  throw new Error(
    "VITE_API_URL is not set. Set it in your deployment environment variables."
  );
}
const finalurl= `${baseURL}/api`;
const api = axios.create({
  baseURL: finalurl,
  withCredentials: true,
});

export default api;