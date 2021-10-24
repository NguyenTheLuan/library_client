import axiosClient from "./axiosClient";

const productsApi = {
  // fn: lấy danh sách các đầu sách
  getBooks: () => {
    const url = "/books";
    return axiosClient.get(url);
  },
};

export default productsApi;
