import axiosClient from "./axiosClient";
// const { default: axiosClient } = require("./axiosClient");

// const USER_API_ENDPOINT = "/users";
const USER_API_ENDPOINT = "/users";
const userApi = {
  //fn: xem info của user
  getInfoUsers: (idUser) => {
    const url = `${USER_API_ENDPOINT}/${idUser}`;
    return axiosClient.get(url);
  },
  // fn: lấy danh sách trong giỏ hàng người dùng
  getCarts: (id) => {
    const url = `${USER_API_ENDPOINT}/${id}/cart`;
    return axiosClient.get(url);
  },

  //fn: thêm sách vào giỏ sách người dùng
  postAddToCart: (id, bookId) => {
    const url = `${USER_API_ENDPOINT}/${id}/cart/${bookId}`;
    return axiosClient.post(url);
  },

  //fn: xoá sách khỏi giỏ sách của người dùng
  deleteBooksOfCart: (id, bookId) => {
    const url = `${USER_API_ENDPOINT}/${id}/cart/${bookId}`;
    return axiosClient.delete(url);
  },

  //fn: lấy lịch sử mượn trả sách của người dùng
  postScheduledTimes: (id) => {
    const url = `${USER_API_ENDPOINT}/${id}/books`;
    return axiosClient.post(url);
  },
  //fn: tạo lịch hẹn nhận sách mới
  postSchedule: (id, books) => {
    const url = `${USER_API_ENDPOINT}/${id}/reservations`;
    return axiosClient.post(url, books);
  },

  //fn: Lấy danh sách hẹn của người dùng
  getSchedule: (id) => {
    const url = `${USER_API_ENDPOINT}/${id}/reservations`;
    return axiosClient.get(url);
  },

  //fn: Lấy danh sách đã đặt hẹn của người dùng
  getViewSchedule: (userId) => {
    const url = `${USER_API_ENDPOINT}/${userId}/books/copies/reservations`;
    return axiosClient.get(url);
  },
};

export default userApi;
