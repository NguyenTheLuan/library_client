import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

function NotFound() {
  return (
    <div className="notFoundMenu">
      <span>404 - Không có trang này</span>
      <Link to="/">Quay về trang chủ</Link>
    </div>
  );
}

export default NotFound;
