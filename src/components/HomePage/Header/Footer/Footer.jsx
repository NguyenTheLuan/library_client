import React from "react";
import { AiOutlineFieldTime, AiFillLike, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import "./Footer.scss";
function Footer() {
  return (
    <div className="footer">
      <div className="footer_items">
        <AiOutlineFieldTime className="icon" />
        <span className="title">Tiết kiệm thời gian</span>
      </div>
      <div className="footer_items">
        <AiFillLike className="icon" />
        <span className="title">Đa dạng và chất lượng</span>
      </div>
      <div className="footer_items">
        <BiPhoneCall className="icon" />
        <span className="title">Liên hệ: 000.222.222</span>
      </div>
      <div className="footer_items">
        <AiOutlineMail className="icon" />
        <span className="title">Email: email@gmail</span>
      </div>
    </div>
  );
}

export default Footer;
