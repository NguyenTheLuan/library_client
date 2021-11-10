import userApi from "apis/userApi";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { FaUserCircle } from "react-icons/fa";

import "./UserInfo.scss";

function UserInfo() {
  const { path } = useRouteMatch();
  const [infoUser, setInfoUser] = useState([]);
  useEffect(() => {
    getInfoUsers();
  }, []);

  const getInfoUsers = async () => {
    const idUser = path.split("/")[4];
    try {
      const response = await userApi.getInfoUsers(idUser);
      // console.log("đã lấy được thông tin user", response);
      setInfoUser([response]);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const renderUser = infoUser?.map((userInfo) => {
    return (
      <>
        <div className="userMain_contents_items">
          <span className="title">ID người dùng:</span>
          <span className="value">{userInfo.id}</span>
        </div>
        <div className="userMain_contents_items">
          <span className="title">Tên người dùng:</span>
          <span className="value">{userInfo.name}</span>
        </div>
        <div className="userMain_contents_items">
          <span className="title">Vai trò:</span>
          <span className="value">{userInfo.role}</span>
        </div>
        <div className="userMain_contents_items">
          <span className="title">Email:</span>
          <span className="value">{userInfo.email}</span>
        </div>
        <div className="userMain_contents_items">
          <span className="title">Trạng thái email:</span>
          <span className="value">{userInfo.isEmailVerified}</span>
        </div>
        <div className="userMain_contents_items">
          <span className="title"> Trạng thái:</span>
          <span className="value">{userInfo.status}</span>
        </div>
      </>
    );
  });

  return (
    <div className="userMain">
      <div className="userMain_img">
        <FaUserCircle className="icon" />
        <span>(Ảnh đại diện)</span>
      </div>
      <div className="userMain_contents">{renderUser}</div>
    </div>
  );
}

export default UserInfo;
