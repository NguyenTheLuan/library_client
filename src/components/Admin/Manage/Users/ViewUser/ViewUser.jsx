import adminApi from "apis/adminApi";
import "components/Admin/Manage/ViewForm.scss";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers, selectTotalUsers } from "reducers/userSlice";
import DeleteUser from "../DeleteUser/DeleteUser";
import UpdateUser from "../UpdateUser/UpdateUser";

function ViewUser() {
  const [userItems, setUserItems] = useState([]);

  const dispatch = useDispatch();
  const users = useSelector(selectTotalUsers);
  const [err, setErr] = useState("");

  useEffect(() => {
    getAllUsers();
  }, [users]);

  const getAllUsers = async () => {
    try {
      const response = await adminApi.getAllUser();

      // console.log("users:", response.results);
      setUserItems(response.results);
      //Lưu vô session storage
      sessionStorage.setItem(
        "totalUsers",
        JSON.stringify(response.totalResults)
      );
      //Lưu vô redux
      dispatch(getUsers(response.totalResults));
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
      return <Button variant="outline-primary">Kích hoạt email</Button>;
    } else if (isActive) {
      return <Button disabled>Đã Cập Nhật</Button>;
    }
  };

  const showUsers = userItems.map((user, index) => {
    if (user.role === "user") {
      return (
        <tr className="viewMenu_table_body_row" key={index}>
          <td>{index - 2}</td>
          <td>{user.name}</td>
          <td>{user.role}</td>
          <td>{user.email}</td>
          <td>{activeEmail(user.isEmailVerified)}</td>
          {/* custom td */}
          <td>
            <UpdateUser userInfo={user} />
          </td>
          <td>
            <DeleteUser userId={user.id} userEmail={user.email} />
          </td>
        </tr>
      );
    }
    return null;
  });

  return (
    <div className="viewMenu">
      {/* <div className="formContainer"> */}
      <h2>Thông Tin Người Dùng</h2>
      <Table className="viewMenu_table" striped bordered hover>
        {err && (
          <Link to="/login">
            <h2>{err}</h2>
          </Link>
        )}
        <thead className="viewMenu_table_header">
          <tr className="viewMenu_table_header_row">
            <th>STT</th>
            <th>Tên Người Dùng</th>
            <th>Chức vụ</th>
            <th>Email</th>
            <th>Trình trạng email</th>
            <th>Thay đổi thông tin</th>
            <th>Xoá người dùng</th>
          </tr>
        </thead>
        <tbody className="viewMenu_table_body">{showUsers}</tbody>
      </Table>
      {/* </div> */}
    </div>
  );
}

export default ViewUser;
