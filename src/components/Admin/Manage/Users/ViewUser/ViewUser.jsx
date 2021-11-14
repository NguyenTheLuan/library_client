import adminApi from "apis/adminApi";
import "components/Admin/Manage/ViewForm.scss";
import SearchUsersAdmin from "components/customComponents/InputForms/SearchForm/SearchUsersAdmin";
import PaginationItems from "components/customComponents/PaginationItems/PaginationItems";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, selectTotalUsers } from "reducers/adminSlice";
import { createCarts } from "reducers/librarianSlice";
import DeleteUser from "../DeleteUser/DeleteUser";
import UpdateUser from "../UpdateUser/UpdateUser";
import UserDetails from "../UserDetails/UserDetails";

function ViewUser() {
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
  //Set row
  const handleTotalRows = (newRows) => {
    // console.log("cha đã nhận được số sản phẩm mới", newRows);
    setTotalUsers(newRows);
  };

  //Lần 1 render all
  useEffect(() => {
    getAllUsers();
  }, [newPage, searchInfo, users, update]);

  const getAllUsers = async () => {
    const params = {
      role: role,
      page: newPage,
      limit: limitPage,
      ...searchInfo,
    };
    console.log("tiến hành search", params);
    try {
      const response = await adminApi.getAllUser(params);
      setUserItems();
      // console.log(response);
      // console.log("users:", response.results);
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
      return (
        <span className="emailStatus" style={{ color: "red" }}>
          {email}
        </span>
      );
    } else {
      return <span className="emailStatus">{email}</span>;
    }
  };

  //Nhập giá trị update sau khi thay đổi
  const handleUpdate = (status) => {
    // console.log("lấy được trạng thái", status);
    setUpdate(status);
  };

  //Nhận thông tin từ user con
  const handleInfo = (infoUser) => {
    console.log("đã nhận được thông tin", infoUser);
    setSearchInfo(infoUser);
  };

  const showUsers = userItems?.map((user, index) => {
    return (
      <tr className="tableItems" key={index}>
        {/* <td>{index + 1} </td> */}
        <td>{user.name}</td>
        <td>{user.role}</td>
        <td>{user.status}</td>
        <td>{activeEmail(user.isEmailVerified, user.email)}</td>

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
      <div className="viewMenu_search">
        <div className="search">
          <legend>Thông tin người dùng</legend>
          <SearchUsersAdmin onChangeInfo={handleInfo} />
        </div>
      </div>
      <div className="viewMenu_table">
        <Table className="tableForm" striped bordered hover>
          <thead className="tableForm_header">
            <tr className="tableItems">
              {/* <th>STT</th> */}
              <th>Tên Người Dùng</th>
              <th>Chức vụ</th>
              <th>Trạng thái</th>
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
