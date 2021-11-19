import reportsApi from "apis/reportsApi";
import React, { useEffect, useState } from "react";
import BookReports from "./BookReports/BookReports";
import ReservationReports from "./ReservationReports/ReservationReports";
import UserReports from "./UserReports/UserReports";
import UserReportsOverall from "./UserReports/UserReportsOverall";

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
      console.log(response);
      //Set cho user
      setUsersChart(response.user);
      setUsersPie(response.user);
      //Set cho reservation
      setReservationsChart(response.reservation);

      //Set cho books
      setBooksChart(response.book);
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

  const renderTime = () => {
    if (startDay) {
      if (endDay) {
        return (
          <>
            Từ ngày <strong>{startDay}</strong> đến ngày
            <strong>{endDay}</strong>
          </>
        );
      }
      return (
        <>
          Từ ngày <strong>{startDay}</strong> đến nay
        </>
      );
    }
  };

  return (
    <div>
      <div>
        Thống kê hoạt động {renderTime()}
        <div>
          <input type="date" onChange={(e) => handleStartDay(e.target.value)} />
          <input type="date" onChange={(e) => handleEndDay(e.target.value)} />
        </div>
      </div>
      <div>
        <div style={{ display: "flex" }}>
          <UserReports usersChart={usersChart} />
          <UserReportsOverall usersPie={usersPie} />
        </div>
        <div>
          <ReservationReports reservationsChart={reservationsChart} />
        </div>
        <div>
          <BookReports booksChart={booksChart} />
        </div>
      </div>
    </div>
  );
}

export default ReportActivities;
