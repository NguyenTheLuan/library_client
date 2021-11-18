import reportsApi from "apis/reportsApi";
import React, { useEffect, useState } from "react";
import BookReports from "./BookReports/BookReports";
import ReservationReports from "./ReservationReports/ReservationReports";
import UserReports from "./UserReports/UserReports";

function ReportActivities() {
  const [startDay, setStartDay] = useState();
  const [endDay, setEndDay] = useState();

  const [usersChart, setUsersChart] = useState([]);
  const [reservationsChart, setReservationsChart] = useState([]);
  const [booksChart, setBooksChart] = useState([]);

  useEffect(() => {
    getReports();
  }, [startDay, endDay]);

  const getReports = async () => {
    const time = { from: startDay, to: endDay, view: "overall" };
    try {
      const response = await reportsApi.getReports(time);
      console.log(response);
      setUsersChart(response.user);
      setReservationsChart(response.reservation);
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
        <UserReports usersChart={usersChart} />
        <ReservationReports reservationsChart={reservationsChart} />
        <BookReports booksChart={booksChart} />
      </div>
    </div>
  );
}

export default ReportActivities;
