import axiosClient from "./axiosClient";
const USERS_API_ENDPOINT = "/users";

const adminApi = {
  //fn: lấy danh sách user
  getAllUser: () => {
    const url = USERS_API_ENDPOINT;
    return axiosClient.get(url);
  },
  //fn: tạo người dùng mới
  createUser: (userInfo) => {
    const url = USERS_API_ENDPOINT;
    return axiosClient.post(url, userInfo);
  },
};

export default adminApi;
