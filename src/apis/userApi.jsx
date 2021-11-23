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
  //fn: thay đổi thông tin ngườI dùng
  updateInfo: (idUser, infoUpdate) => {
    const url = `${USER_API_ENDPOINT}/${idUser}`;
    return axiosClient.patch(url, { params: infoUpdate });
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
  postScheduledTimes: (userId) => {
    const url = `${USER_API_ENDPOINT}/${userId}/books`;
    return axiosClient.get(url);
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
  //Xoá 1 lịch hẹn
  postDeleteReservation: (userId, reservedId) => {
    const url = `${USER_API_ENDPOINT}/${userId}/reservations/${reservedId}`;
    return axiosClient.delete(url);
  },

  //Phần admin, librarian quản lý

  //fn: Lấy danh sách đã đặt hẹn của người dùng
  getBookReserved: (userId) => {
    const url = `${USER_API_ENDPOINT}/${userId}/books/copies/reservations`;
    return axiosClient.get(url);
  },
  // Lấy danh sách tất cả lịch hẹn của người dùng
  getUserReservation: (userInfo) => {
    const url = `${USER_API_ENDPOINT}/reservations`;
    return axiosClient.get(url, { params: userInfo });
  },
};

export default userApi;
