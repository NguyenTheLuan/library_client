import accountApi from "apis/authApi";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

function ActiveEmail() {
  //   console.log("nút active email", email);

  const sendEmail = async () => {
    const url = { redirectUrl: "http://localhost:3000/user/profile/verify" };
    try {
      await accountApi.sendVerificationEmail(url);
    } catch (error) {
      console.log("sai rồi");
      console.log({ error });
    }
  };

  return (
    <div>
      <Button onClick={sendEmail}>Kích hoạt email</Button>
    </div>
  );
}

export default ActiveEmail;
