import accountApi from "apis/authApi";
import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";

function VerifyEmail() {
  const history = useHistory();
  const location = useLocation();
  const tokenActive = new URLSearchParams(location.search).get("token");
  useEffect(() => {
    activeEmail();
  }, []);

  const activeEmail = async () => {
    try {
      await accountApi.verificationEmail(tokenActive);
      // console.log("đã chạy!!");
      alert("Kích hoạt email thành công");
      history.push("/user");
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return <div></div>;
}

export default VerifyEmail;
