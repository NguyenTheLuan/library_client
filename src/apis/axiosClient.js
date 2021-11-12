// api/axiosClient.js
import axios from "axios";
import accountApi from "./authApi";
// import queryString from "query-string";

function getAccessToken() {
  const accessToken = JSON.parse(localStorage.getItem("access")).token;
  return accessToken;
}
function refreshToken() {
  const refreshToken = JSON.parse(localStorage.getItem("refresh")).token;
  return accountApi.postRefreshToken({ refreshToken: refreshToken });
}

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  //   paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  config.params = config.params || {};

  config.headers["Authorization"] = ` Bearer ${
    JSON.parse(localStorage.getItem("access"))?.token
  } `;
  return config;
});

// axiosClient.interceptors.response.use(
//   (response) => {
//     if (response && response.data) {
//       return response.data;
//     }
//     return response;
//   },
//   (error) => {
//     // Handle errors
//     throw error;
//   }
// );

// axiosClient.interceptors.request.use(
//   async (config) => {
//     // Handle token here ...
//     const token = getAccessToken();
//     if (token) {
//       config.headers["Authorization"] = ` Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },

  async (error) => {
    // Handle errors

    if (error.response) {
      //Call request token, access token expires
      if (error.request.status === 401) {
        try {
          const response = await refreshToken();
          //Thiết lập lại access token
          localStorage.setItem("access", JSON.stringify(response.access));
          //Thiết lập lại refresh token
          localStorage.setItem("refresh", JSON.stringify(response.refresh));

          //Test thử
          // alert("refreshToken thành công");
        } catch (error) {
          if (error.response && error.response.data) {
            return Promise.reject(error.response.data);
          }
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);
export default axiosClient;
