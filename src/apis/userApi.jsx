import axiosClient from "./axiosClient";
// const { default: axiosClient } = require("./axiosClient");

// const USER_API_ENDPOINT = "/users";
const USER_API_ENDPOINT = "/users";
const userApi = {
  //Phần user tự quản lý

  //fn: xem info của user
  getInfoUsers: (idUser) => {
    const url = `${USER_API_ENDPOINT}/${idUser}`;
    return axiosClient.get(url);
  },

  // fn: lấy danh sách trong giỏ hàng
  getCarts: (id) => {
    const url = `${USER_API_ENDPOINT}/${id}/cart`;
    return axiosClient.get(url);
  },

  //fn: thêm sách vào giỏ sách
  postAddToCart: (id, bookId) => {
    const url = `${USER_API_ENDPOINT}/${id}/cart/${bookId}`;
    return axiosClient.post(url);
  },

  //fn: xoá sách khỏi giỏ sách
  deleteBooksOfCart: (id, bookId) => {
    const url = `${USER_API_ENDPOINT}/${id}/cart/${bookId}`;
    return axiosClient.delete(url);
  },

  //fn: xem lịch sử mượn trả sách
  postScheduledTimes: (id) => {
    const url = `${USER_API_ENDPOINT}/${id}/books`;
    return axiosClient.post(url);
  },
  //fn: tạo lịch hẹn nhận sách mới
  postSchedule: (id, books) => {
    const url = `${USER_API_ENDPOINT}/${id}/reservations`;
    return axiosClient.post(url, books);
  },

  //fn: Lấy danh sách hẹn của người dùng (người dùng xem, admin-librarian xem)
  getSchedule: (id) => {
    const url = `${USER_API_ENDPOINT}/${id}/reservations`;
    return axiosClient.get(url);
  },

  //Phần admin, librarian quản lý

  //fn: Lấy danh sách đã đặt hẹn của người dùng
  getBookReserved: (userId) => {
    const url = `${USER_API_ENDPOINT}/${userId}/books/copies/reservations`;
    return axiosClient.get(url);
  },
};

export default userApi;
