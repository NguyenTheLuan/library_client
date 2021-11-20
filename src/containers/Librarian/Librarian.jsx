import GetBooks from "components/Admin/Manage/Books/ViewBooks/ViewBooks";
import ReportActivities from "components/Admin/Manage/Reports/ReportActivities/ReportActivities";
import ReportLibrarian from "components/Admin/Manage/Reports/ReportLibrarian/ReportLibrarian";
import CreateUser from "components/Admin/Manage/Users/CreateUser/CreateUser";
import ViewUser from "components/Admin/Manage/Users/ViewUser/ViewUser";
import HomeLibrarian from "components/Librarian/HomeLibrarian/HomeLibrarian";
import LibrarianDashBoard from "components/Librarian/LibrarianDashBoard/LibrarianDashBoard";
import CheckoutBooks from "components/Librarian/Manage/Books/ReservationBook/CheckoutBooks";
import ReturnBooks from "components/Librarian/Manage/Books/ReturnBooks/ReturnBooks";
import ViewBorrowingBooks from "components/Librarian/Manage/Books/ViewBorrowingBooks/ViewBorrowingBooks";
import ViewReservation from "components/Librarian/Manage/Books/ViewReservation/ViewReservation";

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

          <div
            className="containerDashBoard_content"
            style={{ overflowY: "scroll" }}
          >
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
                path={`${path}/books/reservations`}
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
              <Route
                path={`${path}/books/borrowing`}
                component={() => <ViewBorrowingBooks />}
                // exact={true}
              />

              {/* Quản lý báo cáo */}
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

export default Librarian;
