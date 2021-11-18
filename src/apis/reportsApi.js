import axiosClient from "./axiosClient";

const REPORT_API_ENDPOINT = "/reports";

const reportsApi = {
  getReports: (dateInfo) => {
    const url = REPORT_API_ENDPOINT;
    return axiosClient.get(url, { params: { ...dateInfo } });
  },
  getLibrarianActivities: (info) => {
    const url = REPORT_API_ENDPOINT + "/activities";
    return axiosClient.get(url, { params: { ...info } });
  },
};
export default reportsApi;
