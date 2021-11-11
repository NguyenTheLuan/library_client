import AddBooks from "components/Admin/Manage/Books/AddBooks/AddBooks";
import GetBooks from "components/Admin/Manage/Books/ViewBooks/ViewBooks";

import CreateUser from "components/Admin/Manage/Users/CreateUser/CreateUser";
import ViewUser from "components/Admin/Manage/Users/ViewUser/ViewUser";
import HomeLibrarian from "components/Librarian/HomeLibrarian/HomeLibrarian";
import LibrarianDashBoard from "components/Librarian/LibrarianDashBoard/LibrarianDashBoard";
import UserDashBoard from "components/Librarian/ReservationBook/UserDashBoard/UserDashBoard";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";

function Librarian() {
  let { path, url } = useRouteMatch();
  // console.log(path, url);
  return (
    <div className="adminPage">
      <Switch>
        <div className="containerDashBoard">
          <div className="containerDashBoard_menu">
            <LibrarianDashBoard url={url} />
          </div>

          <div className="containerDashBoard_content">
            <div className="containerDashBoard_content_lists">
              <Route
                path={`${path}`}
                component={() => <HomeLibrarian />}
                exact={true}
              />

              {/* Quản lý users */}
              <Route
                path={`${path}/users`}
                component={() => <ViewUser />}
                exact={true}
              />

              {/* Giỏ hàng chi tiết của user */}
              <Route
                path={`${path}/users/view/:id`}
                component={() => <UserDashBoard />}
                // exact={true}
              />
              {/* 
              <Route
                path={`${path}/users/view/:id/carts`}
                component={() => <ViewCartUser />}
                exact={true}
              />
              <Route
                path={`${path}/users/view/:id/resevations`}
                component={() => "trang xem lịch mượn"}
                exact={true}
              />
              <Route
                path={`${path}/users/view/:id/resevations/checkout`}
                component={() => "trang cho mượn"}
                exact={true}
              />
              <Route
                path={`${path}/users/view/:id/resevations/checkin`}
                component={() => "trang trả sách"}
                exact={true}
              /> */}

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

export default Librarian;
