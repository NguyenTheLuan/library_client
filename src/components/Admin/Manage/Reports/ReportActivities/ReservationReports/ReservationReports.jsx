import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

function ReservationReports({ reservationsChart }) {
  const [dataChart, setDataChart] = useState();

  useEffect(() => {
    reservationsChart && renderObj(reservationsChart);
  }, [reservationsChart]);

  // useEffect(() => {
  //   console.log("dataChart", dataChart);
  // }, [dataChart]);

  const renderObj = (reservation) => {
    // console.log("lấy được", reservation);
    const {
      cancelled, // Huỷ hẹn
      fulfilled, // Thành công
      new: Tong, // Tổng cộng
      overdue, //QUá hạn
      pending, //Đang chờ
    } = reservation;

    if (!cancelled || !fulfilled || !Tong || !overdue || !pending) {
      return;
    }
    const keyCanceled = Object.keys(cancelled);
    const keyFulfilled = Object.keys(fulfilled);
    const keyTong = Object.keys(Tong);
    const keyOverdue = Object.keys(overdue);
    const keyPending = Object.keys(pending);

    const set = new Set([
      ...keyCanceled,
      ...keyFulfilled,
      ...keyTong,
      ...keyOverdue,
      ...keyPending,
    ]);

    // console.log(set);
    const newObj = [];

    for (var date of set) {
      newObj.push({
        day: date,
        "Huỷ hẹn": cancelled[date] ? cancelled[date] : 0,
        "Thành công": fulfilled[date] ? fulfilled[date] : 0,
        "Tổng cộng": Tong[date] ? Tong[date] : 0,
        "Quá hạn": overdue[date] ? overdue[date] : 0,
        "Đang chờ": pending[date] ? pending[date] : 0,
      });
    }
    setDataChart(newObj);
    // console.log(newObj);
  };

  return (
    <div>
      <BarChart width={900} height={300} data={dataChart}>
        <XAxis dataKey="day" stroke="#8884d8" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />

        {/* Của user */}
        <Bar dataKey="Đang chờ" fill="#8884d8" barSize={30} />
        <Bar dataKey="Huỷ hẹn" fill="#8884d8" barSize={30} />
        <Bar dataKey="Thành công" fill="#8884d8" barSize={30} />
        <Bar dataKey="Quá hạn" fill="#8884d8" barSize={30} />
        <Bar dataKey="Tổng cộng" fill="#8884d8" barSize={30} />
      </BarChart>

      <span>Thống kê số lượng lịch hẹn </span>
    </div>
  );
}

export default ReservationReports;
