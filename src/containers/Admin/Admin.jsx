import AdminPage from "components/Admin/AdminPage/AdminPage";
import DashBoard from "components/Admin/DashBoard/DashBoard";
import AddBooks from "components/Admin/Manage/Books/AddBooks/AddBooks";
import GetBooks from "components/Admin/Manage/Books/ViewBooks/ViewBooks";
import CreateUser from "components/Admin/Manage/Users/CreateUser/CreateUser";
import ViewUser from "components/Admin/Manage/Users/ViewUser/ViewUser";
import UserInfo from "components/Librarian/ReservationBook/UserInfo/UserInfo";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import "./Admin.scss";

function Admin() {
  let { path, url } = useRouteMatch();
  // console.log("admin routes:", path);
  return (
    <div className="adminPage">
      <Switch>
        <div className="containerDashBoard">
          <div className="containerDashBoard_menu">
            <DashBoard url={url} />
          </div>

          <div className="containerDashBoard_content">
            <div className="containerDashBoard_content_lists">
              <Route
                path={`${path}`}
                component={() => <AdminPage />}
                exact={true}
              />

              {/* Quản lý users */}
              <Route
                path={`${path}/users`}
                component={() => <ViewUser />}
                exact={true}
              />
              <Route
                path={`${path}/users/view/:id`}
                component={() => "đây là trang thông tin chi tiết của user"}
                exact={true}
              />
              <Route
                path={`${path}/users/create`}
                component={() => <CreateUser />}
                exact={true}
              />

              {/* Quản lý sách */}
              <Route
                path={`${path}/books`}
                component={() => <GetBooks />}
                exact={true}
              />
              <Route
                path={`${path}/books/create`}
                component={() => <AddBooks />}
                exact={true}
              />
            </div>
            {/* <Route
              path={`${path}/users/:id`}
              component={() => <UpdateUser />}
              exact={true}
            /> */}
          </div>
        </div>
      </Switch>
    </div>
  );
}

export default Admin;
