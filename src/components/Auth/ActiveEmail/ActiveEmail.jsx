import accountApi from "apis/authApi";
import React from "react";
import { Button } from "react-bootstrap";
import "./ActiveEmail.scss";

function ActiveEmail() {
  const currentURL = window.location.href;
  // console.log(currentURL);
  const sendEmail = async () => {
    const url = { redirectUrl: `${currentURL}/profile/verify` };
    try {
      await accountApi.sendVerificationEmail(url);
      alert("Đã tiến thành xác thực. Hãy kiểm tra hộp thoại email!!");
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <div>
      <Button className="btnActive" onClick={sendEmail}>
        Kích hoạt email
      </Button>
    </div>
  );
}

export default ActiveEmail;
