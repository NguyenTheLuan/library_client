import adminApi from "apis/adminApi";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";

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
  const showUsers = userItems.map((user, index) => {
    return (
      <tr>
        <td>{index}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.isEmailVerified}</td>
        <td>{user.role}</td>
      </tr>
    );
  });

  return (
    <div className="formMainUser">
      <div className="formContainer">
        <h2>Thông Tin Người Dùng</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên Người Dùng</th>
              <th>Email</th>
              <th>Trình trạng email</th>
              <th>Chức vụ</th>
            </tr>
          </thead>
          <tbody>{showUsers}</tbody>
        </Table>
      </div>
    </div>
  );
}

export default ViewUser;
