import AdminPage from "components/Admin/AdminPage/AdminPage";
import DashBoard from "components/Admin/DashBoard/DashBoard";
import GetBooks from "components/Admin/Manage/Books/ViewBooks/ViewBooks";
import ReportActivities from "components/Admin/Manage/Reports/ReportActivities/ReportActivities";
import ReportLibrarian from "components/Admin/Manage/Reports/ReportLibrarian/ReportLibrarian";
import CreateUser from "components/Admin/Manage/Users/CreateUser/CreateUser";
import ViewUser from "components/Admin/Manage/Users/ViewUser/ViewUser";
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

          <div
            className="containerDashBoard_content"
            style={{ overflowY: "scroll" }}
          >
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

              {/* Xuất báo cáo */}
              <Route
                path={`${path}/report`}
                component={() => <ReportActivities />}
                exact={true}
              />
              <Route
                path={`${path}/report/activities`}
                component={() => <ReportLibrarian />}
                exact={true}
              />
            </div>
          </div>
        </div>
      </Switch>
    </div>
  );
}

export default Admin;
