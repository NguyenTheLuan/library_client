import axiosClient from "./axiosClient";

const REPORT_API_ENDPOINT = "/reports";

const reportsApi = {
  //Lấy các báo cáo tổng quan
  getReports: (dateInfo) => {
    const url = REPORT_API_ENDPOINT;
    return axiosClient.get(url, { params: { ...dateInfo } });
  },
  // Lấy danh sách hoạt động của thủ thư
  getLibrarianActivities: (info) => {
    const url = REPORT_API_ENDPOINT + "/activities";
    return axiosClient.get(url, { params: { ...info } });
  },
  //Xuất danh sách người dùng đang mượn sách
  exportBooksBorrowing: () => {
    const url = REPORT_API_ENDPOINT + "/export/books/borrowing";
    return axiosClient.post(url);
  },
};
export default reportsApi;
