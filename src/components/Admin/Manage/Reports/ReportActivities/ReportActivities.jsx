import reportsApi from "apis/reportsApi";
import React, { useEffect, useState } from "react";
import BookReports from "./BookReports/BookReports";
import BooksReportsOverall from "./BookReports/BooksReportsOverall";
import ReservationReports from "./ReservationReports/ReservationReports";
import ReservationReportsOverall from "./ReservationReports/ReservationReportsOverall";
import UserReports from "./UserReports/UserReports";
import UserReportsOverall from "./UserReports/UserReportsOverall";

import "./ReportActivities.scss";

function ReportActivities() {
  document.title = "Thống kê hoạt động";

  const [startDay, setStartDay] = useState();
  const [endDay, setEndDay] = useState();

  //Charts
  const [usersChart, setUsersChart] = useState([]);
  const [reservationsChart, setReservationsChart] = useState([]);
  const [booksChart, setBooksChart] = useState([]);
  //Pies
  const [usersPie, setUsersPie] = useState([]);
  const [reservationsPie, setReservationsPie] = useState([]);
  const [booksPie, setBooksPie] = useState([]);

  useEffect(() => {
    getReports();
  }, [startDay, endDay]);

  const getReports = async () => {
    const time = { from: startDay, to: endDay, view: "overall" };
    try {
      const response = await reportsApi.getReports(time);
      // console.log(response);
      //Set cho user
      setUsersChart(response.user);
      setUsersPie(response.user);
      //Set cho reservation
      setReservationsChart(response.reservation);
      setReservationsPie(response.reservation);
      //Set cho books
      setBooksChart(response.book);
      setBooksPie(response.book);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  //Handle time
  const handleStartDay = (time) => {
    setStartDay(time);
  };
  const handleEndDay = (time) => {
    setEndDay(time);
  };
  //render time
  const renderDate = (time) => {
    // console.log(time);
    return time.split("-").reverse().join("-");
  };

  const renderTime = () => {
    if (startDay) {
      if (endDay) {
        return (
          <>
            từ ngày <strong>{renderDate(startDay)}</strong> đến ngày
            <strong> {renderDate(endDay)}</strong>
          </>
        );
      }
      return (
        <>
          từ ngày <strong>{renderDate(startDay)}</strong> đến nay
        </>
      );
    }
  };

  return (
    <div className="reportContainer">
      <div className="reportContainer_search">
        <legend className="label ">Thống kê hoạt động {renderTime()}</legend>
        <div className="date">
          <input type="date" onChange={(e) => handleStartDay(e.target.value)} />
          <input type="date" onChange={(e) => handleEndDay(e.target.value)} />
        </div>
      </div>
      <div className="reportContainer_contents">
        <div className="reportContainer_contents_items">
          <span className="label">
            Biểu đồ thể hiện chi tiết số lượng người dùng
          </span>
          <div className="charts">
            <UserReports usersChart={usersChart} />
            <UserReportsOverall usersPie={usersPie} />
          </div>
        </div>
        <div className="reportContainer_contents_items">
          <span className="label">
            Biểu đồ thể hiện chi tiết số lượng lịch đặt sách
          </span>
          <div className="charts">
            <ReservationReports reservationsChart={reservationsChart} />
            <ReservationReportsOverall reservationsChart={reservationsPie} />
          </div>
        </div>
        <div className="reportContainer_contents_items">
          <span className="label">Biểu đồ thể hiện số lượng sách đã nhập</span>
          <div className="charts">
            <BookReports booksChart={booksChart} />
            <BooksReportsOverall booksPie={booksPie} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportActivities;
