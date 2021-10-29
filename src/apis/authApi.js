import axiosClient from "./axiosClient";

const ACCOUNT_API_ENDPOINT = "/auth";

const accountApi = {
  // // fn: gửi mã xác nhận
  // postSendVerifyCode: (email) => {
  //   const url = ACCOUNT_API_ENDPOINT + "/verify";
  //   return axiosClient.post(url, email);
  // },
  // fn: đăng ký
  postRegister: (account) => {
    const url = ACCOUNT_API_ENDPOINT + "/register";
    return axiosClient.post(url, account);
  },

  //fn: logout
  postLogout: (token) => {
    const url = ACCOUNT_API_ENDPOINT + "/logout";
    return axiosClient.post(url, token);
  },

  // fn: đăng nhập
  postLogin: (account) => {
    const url = ACCOUNT_API_ENDPOINT + "/login";
    return axiosClient.post(url, account);
  },

  //fn: reset password
  postResetPasword: (password) => {
    const url = ACCOUNT_API_ENDPOINT + "/reset-password";
    return axiosClient.post(url, password);
  },
  //fn: forgot password
  postForgotPasword: (email) => {
    const url = ACCOUNT_API_ENDPOINT + "/forgot-password";
    return axiosClient.post(url, email);
  },

  //fn: gửi kích hoạt email
  sendVerificationEmail: (email) => {
    const url = ACCOUNT_API_ENDPOINT + "/send-verification-email";
    return axiosClient.post(url, email);
  },
  //fn: Xác thực email
  verificationEmail: (token) => {
    const url = ACCOUNT_API_ENDPOINT + "/verify-email";
    // console.log("đây là url", url);
    // console.log("đây là token", token);
    return axiosClient.post(`${url}?token=${token}`);
  },
};

export default accountApi;
