import GetBooks from "components/Admin/Manage/Books/ViewBooks/ViewBooks";
import CreateUser from "components/Admin/Manage/Users/CreateUser/CreateUser";
import ViewUser from "components/Admin/Manage/Users/ViewUser/ViewUser";
import HomeLibrarian from "components/Librarian/HomeLibrarian/HomeLibrarian";
import LibrarianDashBoard from "components/Librarian/LibrarianDashBoard/LibrarianDashBoard";
import CheckoutBooks from "components/Librarian/Manage/Books/ReservationBook/CheckoutBooks";
import ReturnBooks from "components/Librarian/Manage/Books/ReturnBooks/ReturnBooks";
import ViewReservation from "components/Librarian/Manage/Books/ViewReservation/ViewReservation";
import UserDashBoard from "components/Librarian/Manage/Users/UserDashBoard/UserDashBoard";
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
              {/* <Route
                path={`${path}/users/view/:id`}
                component={() => <UserDashBoard />}
                // exact={true}
              /> */}

              <Route
                path={`${path}/users/create`}
                component={() => <CreateUser />}
                exact={true}
              />

              {/* Quản lý sách */}
              <Route
                path={`${path}/books/view`}
                component={() => <GetBooks />}
                exact={true}
              />
              <Route
                path={`${path}/books/reservation`}
                component={() => <ViewReservation />}
                exact={true}
              />
              <Route
                path={`${path}/books/copies`}
                component={() => <CheckoutBooks />}
                // exact={true}
              />
              <Route
                path={`${path}/books/return`}
                component={() => <ReturnBooks />}
                // exact={true}
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
