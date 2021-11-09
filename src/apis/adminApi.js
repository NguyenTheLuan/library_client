import axiosClient from "./axiosClient";
const USERS_API_ENDPOINT = "/users";

const adminApi = {
  //fn: lấy danh sách user
  getAllUser: (infoUser) => {
    const url = USERS_API_ENDPOINT;
    return axiosClient.get(url, { params: infoUser });
  },
  //fn: tạo người dùng mới
  createUser: (userInfo) => {
    const url = USERS_API_ENDPOINT;
    return axiosClient.post(url, userInfo);
  },
  //fn: lấy thông tin chi tiết
  userIdInfo: (userId) => {
    const url = `${USERS_API_ENDPOINT}/${userId}`;
    return axiosClient.post(url);
  },
  //fn: cập nhật thông tin
  updateUser: (userId, userInfo) => {
    const url = `${USERS_API_ENDPOINT}/${userId}`;
    return axiosClient.patch(url, userInfo);
  },
  //fn: xoá người dùng
  deleteUser: (userId) => {
    const url = `${USERS_API_ENDPOINT}/${userId}`;
    return axiosClient.delete(url);
  },
  //fn: lấy danh sách trong giỏ hàng người dùng
  getUserCarts: (userId) => {
    const url = `${USERS_API_ENDPOINT}/${userId}/cart`;
    return axiosClient.get(url);
  },
  //fn: thêm sách vào giỏ sách người dùng
  addUserCarts: (userId, bookId) => {
    const url = `${USERS_API_ENDPOINT}/${userId}/cart/${bookId}`;
    return axiosClient.post(url);
  },
  //fn: xoá sách khỏi giỏ sách người dùng
  deleteUserCarts: (userId, bookId) => {
    const url = `${USERS_API_ENDPOINT}/${userId}/cart/${bookId}`;
    return axiosClient.delete(url);
  },
  //fn: tạo lịch hẹn nhận sách mới
  createUserReservation: (userId) => {
    const url = `${USERS_API_ENDPOINT}/${userId}/reservations`;
    return axiosClient.post(url);
  },
  //fn:lấy danh sách lịch hẹn của người dùng
  getUserReservation: (userId) => {
    const url = `${USERS_API_ENDPOINT}/${userId}/reservations`;
    return axiosClient.get(url);
  },
  //fn:lấy danh sách các bản sao đã được đặt lịch hẹn lấy
  getUserBooksReservation: (userId) => {
    const url = `${USERS_API_ENDPOINT}/${userId}/books/reservations`;
    return axiosClient.get(url);
  },
  //fn: cho người dùng mượn sách
  userBookCheckout: (userId) => {
    const url = `${USERS_API_ENDPOINT}/${userId}/books/checkout`;
    return axiosClient.post(url);
  },
};

export default adminApi;
