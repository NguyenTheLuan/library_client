import adminApi from "apis/adminApi";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers, selectTotalUsers } from "reducers/adminSlice";
import DeleteUser from "../DeleteUser/DeleteUser";
import UpdateUser from "../UpdateUser/UpdateUser";

import "components/Admin/Manage/ViewForm.scss";
import PaginationItems from "components/customComponents/PaginationItems/PaginationItems";

function ViewUser() {
  const [userItems, setUserItems] = useState([]);

  const users = useSelector(selectTotalUsers);

  const dispatch = useDispatch();
  const [err, setErr] = useState("");

  //Pagination
  const [totalUsers, setTotalUsers] = useState();
  const [limitPage, setLimitPage] = useState(5);
  const [newPage, setNewPage] = useState(1);
  //Chuyển trang mới
  const handleChangePage = (newPage) => {
    setNewPage(newPage);
  };

  //Lần 1 render all
  useEffect(() => {
    getAllUsers();
  }, [newPage, users]);

  const getAllUsers = async () => {
    const params = { page: newPage, limit: limitPage };
    try {
      const response = await adminApi.getAllUser(params);
      setUserItems();
      console.log(response);
      // console.log("users:", response.results);
      setUserItems(response.results);
      //Lưu vô session storage
      sessionStorage.setItem(
        "totalUsers",
        JSON.stringify(response.totalResults)
      );
      //Set lại tổng user
      setTotalUsers(response.totalResults);
      //Lưu vô redux
      dispatch(getUsers(response.results));
    } catch (error) {
      setErr(error.response.data.message);
    }
  };

  const activeEmail = (isActive) => {
    if (!isActive) {
      return (
        <span className="emailStatus" style={{ color: "red" }}>
          Chưa kích hoạt
        </span>
      );
    } else if (isActive) {
      return <span className="emailStatus">Đã kích hoạt</span>;
    }
  };

  const showUsers = userItems?.map((user, index) => {
    return (
      <tr className="tableItems" key={index}>
        <td>{index + 1} </td>
        <td>{user.name}</td>
        <td>{user.role}</td>
        <td className="emailInfo">
          <span className="emailName">{user.email}</span>
          {activeEmail(user.isEmailVerified)}
        </td>

        {/* custom td */}
        <td>
          <UpdateUser userInfo={user} />
        </td>
        <td>
          <DeleteUser userId={user.id} userEmail={user.email} />
        </td>
        <td>
          <Button variant="info">Xem chi tiết</Button>
        </td>
      </tr>
    );
  });

  return (
    <div className="viewMenu">
      <div className="viewMenu_search">
        <h2>Thông Tin Người Dùng</h2>
      </div>
      <div className="viewMenu_table">
        <Table className="tableForm" striped bordered hover>
          {err && (
            <Link to="/login">
              <h2>{err}</h2>
            </Link>
          )}
          <thead className="tableForm_header">
            <tr className="tableItems">
              <th>STT</th>
              <th>Tên Người Dùng</th>
              <th>Chức vụ</th>
              <th>Email</th>
              <th>Thay đổi thông tin</th>
              <th>Xoá người dùng</th>
              <th>Xem chi tiết</th>
            </tr>
          </thead>
          <tbody className="tableForm_body">{showUsers}</tbody>
        </Table>
      </div>
      <div className="viewMenu_pagination">
        <PaginationItems
          totalRows={totalUsers}
          limit={limitPage}
          onChangePage={handleChangePage}
        />
      </div>
    </div>
  );
}

export default ViewUser;
