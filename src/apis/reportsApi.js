import axiosClient from "./axiosClient";

const REPORT_API_ENDPOINT = "/reports";

const reportsApi = {
  getReports: (dateInfo) => {
    const url = REPORT_API_ENDPOINT;
    return axiosClient.get(url, { params: { ...dateInfo } });
  },
};
export default reportsApi;
