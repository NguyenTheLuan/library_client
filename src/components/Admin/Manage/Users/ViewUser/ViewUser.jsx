import adminApi from "apis/adminApi";
import SearchUsersAdmin from "components/customComponents/InputForms/SearchForm/SearchUsersAdmin";
import PaginationItems from "components/customComponents/PaginationItems/PaginationItems";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { getUsers, selectTotalUsers } from "reducers/adminSlice";
import DeleteUser from "../DeleteUser/DeleteUser";
import UpdateUser from "../UpdateUser/UpdateUser";
import "components/Admin/Manage/ViewForm.scss";
import { createCarts } from "reducers/librarianSlice";

function ViewUser() {
  //Thông tin user
  const [userItems, setUserItems] = useState([]);
  const [searchInfo, setSearchInfo] = useState();

  //Nhận user từ redux
  const users = useSelector(selectTotalUsers);
  const dispatch = useDispatch();
  const [err, setErr] = useState("");

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
    dispatch(createCarts([]));
    getAllUsers();
  }, [newPage, searchInfo, users]);

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

  const activeEmail = (isActive, email) => {
    if (!isActive) {
      return (
        <span className="emailStatus" style={{ color: "red" }}>
          {email}
        </span>
      );
    } else if (isActive) {
      return <span className="emailStatus">{email}</span>;
    }
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
          <UpdateUser userInfo={user} />
        </td>
        <td>
          <DeleteUser userId={user.id} userEmail={user.email} />
        </td>
        <td>
          <Button variant="info" userId={user.id}>
            Xem chi tiết
          </Button>
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
          {err && (
            <Link to="/login">
              <h2>{err}</h2>
            </Link>
          )}
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
