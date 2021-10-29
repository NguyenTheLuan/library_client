import accountApi from "apis/authApi";
import React, { useEffect } from "react";
import { useLocation } from "react-router";

function VerifyEmail() {
  const location = useLocation();
  const tokenActive = new URLSearchParams(location.search).get("token");
  useEffect(() => {
    activeEmail();
  }, []);

  const activeEmail = async () => {
    try {
      await accountApi.verificationEmail(tokenActive);
      console.log("đã chạy!!");
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return <div></div>;
}

export default VerifyEmail;
