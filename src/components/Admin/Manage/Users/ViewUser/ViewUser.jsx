import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, selectTotalUsers } from "reducers/adminSlice";
import adminApi from "apis/adminApi";

import SearchUsersAdmin from "components/customComponents/InputForms/SearchForm/SearchUsersAdmin";
import PaginationItems from "components/customComponents/PaginationItems/PaginationItems";
import DeleteUser from "../DeleteUser/DeleteUser";
import UpdateUser from "../UpdateUser/UpdateUser";
import UserDetails from "../UserDetails/UserDetails";

import "components/Admin/Manage/ViewForm.scss";
import { renderCheckActive } from "constants/RenderDate";

function ViewUser() {
  document.title = "Danh sách người dùng";

  //Thông tin user
  const [userItems, setUserItems] = useState([]);
  //Để search
  const [searchInfo, setSearchInfo] = useState();
  //Để update
  const [update, setUpdate] = useState(false);

  //Nhận user từ redux
  const users = useSelector(selectTotalUsers);
  const dispatch = useDispatch();

  //Pagination
  const [role, setRole] = useState("user");
  const [totalUsers, setTotalUsers] = useState();
  const [limitPage, setLimitPage] = useState(5);
  const [newPage, setNewPage] = useState(1);

  //Chuyển trang mới
  const handleChangePage = (newPage) => {
    setNewPage(newPage);
  };
  const handleLimitChange = (newLimit) => {
    setNewPage(1);
    setLimitPage(newLimit);
  };

  //Lần 1 render all
  useEffect(() => {
    getAllUsers();
  }, [newPage, limitPage, searchInfo, users, update]);

  const getAllUsers = async () => {
    const params = {
      role: role,
      page: newPage,
      limit: limitPage,
      ...searchInfo,
    };
    // console.log("tiến hành search", params);
    try {
      const response = await adminApi.getAllUser(params);
      setUserItems();
      // console.log(response);
      setUserItems(response.results);
      //Lưu vô session storage
      sessionStorage.setItem(
        "totalUsers",
        JSON.stringify(response.totalResults)
      );
      //Để phân trang
      setTotalUsers(response.totalResults);
      //Lưu vô redux
      dispatch(getUsers(response.results));
    } catch (error) {
      // setErr(error.response.data.message);
      console.log("có lỗi", { error });
    }
  };

  //render component
  const activeEmail = (isActive, email) => {
    if (!isActive) {
      return <span style={{ color: "red" }}>{email}</span>;
    } else {
      return <span>{email}</span>;
    }
  };

  //Nhập giá trị update sau khi thay đổi
  const handleUpdate = (status) => {
    setUpdate(status);
  };

  //Nhận thông tin từ user con
  const handleInfo = (infoUser) => {
    // console.log("đã nhận được thông tin", infoUser);
    setNewPage(1);
    setSearchInfo(infoUser);
  };

  const showUsers = userItems?.map((user, index) => {
    return (
      <tr key={index}>
        <td>{index + 1 + (newPage - 1) * limitPage} </td>
        <td className="emailName">
          {activeEmail(user.isEmailVerified, user.email)}
        </td>
        <td>{user.name}</td>
        <td>{user.role}</td>
        <td>{renderCheckActive(user.status)}</td>

        {/* custom td */}
        <td>
          <UpdateUser onUpdate={handleUpdate} update={update} userInfo={user} />
        </td>
        <td>
          <DeleteUser userId={user.id} userEmail={user.email} />
        </td>
        <td>
          <UserDetails userInfo={user} />
        </td>
      </tr>
    );
  });

  return (
    <div className="viewMenu">
      <legend className="viewMenu_title">Quản lý thông tin người dùng</legend>
      <div className="viewMenu_search">
        <div className="search">
          <SearchUsersAdmin onChangeInfo={handleInfo} />
        </div>
      </div>
      <div className="viewMenu_table">
        <Table className="tableForm" striped bordered hover>
          <thead className="tableForm_header">
            <tr>
              <th>STT</th>
              <th>Email</th>
              <th>Tên Người Dùng</th>
              <th>Chức vụ</th>
              <th>Trạng thái</th>
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
          activePage={newPage}
          onChangePage={handleChangePage}
          onChangeLimit={handleLimitChange}
        />
      </div>
    </div>
  );
}

export default ViewUser;
