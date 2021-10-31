import adminApi from "apis/adminApi";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// import "../UsersForm.scss";

function ViewUser() {
  const [userItems, setUserItems] = useState([]);
  const [err, setErr] = useState("");
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await adminApi.getAllUser();

      // console.log("users:", response.results);
      setUserItems(response.results);
    } catch (error) {
      // console.log("err", error.response.data.message);
      // console.log({ error });
      setErr(error.response.data.message);
    }
  };
  // console.log(userItems);
  const activeEmail = (isActive) => {
    // console.log(isActive);
    if (!isActive) {
      return <Button>Kích hoạt email</Button>;
    } else if (isActive) {
      return <Button disabled> Đã Cập Nhật</Button>;
    }
  };

  const showUsers = userItems.map((user, index) => {
    if (user.role === "user") {
      return (
        <tr key={index}>
          <td>{index}</td>
          <td>{user.name}</td>
          <td>{user.role}</td>
          <td>{user.email}</td>
          <td>{activeEmail(user.isEmailVerified)}</td>
          {/* custom td */}
          <td>
            <Button variant="success">Thay đổi thông tin</Button>
          </td>
          <td>
            <Button variant="danger">Xoá người dùng</Button>
          </td>
        </tr>
      );
    }
    return null;
  });

  return (
    <div className="formMainUser">
      <div className="formContainer">
        <h2>Thông Tin Người Dùng</h2>
        <Table striped bordered hover>
          {err && (
            <Link to="/login">
              <h2>{err}</h2>
            </Link>
          )}
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên Người Dùng</th>
              <th>Chức vụ</th>
              <th>Email</th>
              <th>Trình trạng email</th>
              <th>Thay đổi thông tin</th>
              <th>Xoá người dùng</th>
            </tr>
          </thead>
          <tbody>{showUsers}</tbody>
        </Table>
      </div>
    </div>
  );
}

export default ViewUser;
