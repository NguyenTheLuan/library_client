import axiosClient from "./axiosClient";
const PRODUCTS_API_ENDPOINT = "/books";

const productsApi = {
  // fn: lấy danh sách các đầu sách
  getBooks: () => {
    const url = PRODUCTS_API_ENDPOINT;
    return axiosClient.get(url);
  },
  //get books by Id
  getBooksById: (id) => {
    const url = `${PRODUCTS_API_ENDPOINT}/${id}`;
    return axiosClient.get(url);
  },
  //tạo sách mới
  postCreateBook: (bookInfo) => {
    const url = PRODUCTS_API_ENDPOINT;
    return axiosClient.post(url, bookInfo);
  },
  //xoá sách
  postDeleteBookById: (bookId) => {
    const url = `${PRODUCTS_API_ENDPOINT}/${bookId}`;
    return axiosClient.delete(url);
  },
};

export default productsApi;
