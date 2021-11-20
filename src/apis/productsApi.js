import axiosClient from "./axiosClient";
const PRODUCTS_API_ENDPOINT = "/books";

const productsApi = {
  // fn: lấy danh sách các đầu sách
  getBooks: (bookInfo) => {
    const url = PRODUCTS_API_ENDPOINT;
    return axiosClient.get(url, { params: bookInfo });
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
  //Update book byId
  updateBookById: (bookId, infoBooks) => {
    const url = `${PRODUCTS_API_ENDPOINT}/${bookId}`;
    return axiosClient.patch(url, infoBooks);
  },
  //Search books
  searchBooks: (bookInfo) => {
    const url = `${PRODUCTS_API_ENDPOINT}`;
    return axiosClient.get(url, { params: bookInfo });
  },

  //Lấy tên tác giả
  getAuthorName: () => {
    const url = PRODUCTS_API_ENDPOINT + "/authors";
    return axiosClient.get(url);
  },
  //Lấy tên danh mục
  getCategoriesName: () => {
    const url = PRODUCTS_API_ENDPOINT + "/categories";
    return axiosClient.get(url);
  },

  //get books by Id
  getBooksById: (id) => {
    const url = `${PRODUCTS_API_ENDPOINT}/${id}`;
    return axiosClient.get(url);
  },

  //Librarian, admin

  //Check mã sách
  getCheckCopies: (copiesId) => {
    const url = `${PRODUCTS_API_ENDPOINT}/copies/${copiesId}`;
    return axiosClient.get(url);
  },
  //Tạo 1 bản sao cho sách
  postCopies: (bookId) => {
    const url = `${PRODUCTS_API_ENDPOINT}/${bookId}/copies`;
    return axiosClient.post(url);
  },

  //Cho người mượn sách
  postCopiesCheckout: (userInfo) => {
    const url = `${PRODUCTS_API_ENDPOINT}/copies/checkout`;
    return axiosClient.post(url, userInfo);
  },
  //Lấy các bản sao sách đang được mượn
  getCopiesBorrowing: (infoBorrow) => {
    const url = `${PRODUCTS_API_ENDPOINT}/copies/borrowing`;
    return axiosClient.get(url, { params: infoBorrow });
  },
};

export default productsApi;
