import React, { useEffect, useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ReservationReportstoExcel from "./ReservationReportstoExcel";

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
      canceled, // Huỷ hẹn
      fulfilled, // Thành công
      new: Tong, // Tổng cộng
      overdue, //QUá hạn
      pending, //Đang chờ
    } = reservation;

    if (!canceled || !fulfilled || !Tong || !overdue || !pending) {
      return;
    }
    const keyCanceled = Object.keys(canceled);
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
        "Huỷ hẹn": canceled[date] ? canceled[date] : 0,
        "Thành công": fulfilled[date] ? fulfilled[date] : 0,
        "Tổng cộng": Tong[date] ? Tong[date] : 0,
        "Quá hạn": overdue[date] ? overdue[date] : 0,
        "Đang chờ": pending[date] ? pending[date] : 0,
      });
    }
    newObj.sort(day_sort);
    // console.log("sau khi sắp xếp", newObj);
    setDataChart(newObj);
  };

  const day_sort = (prevDay, nextDay) => {
    return (
      new Date(
        prevDay.day.replace(/^(\d{1,2}\/)(\d{1,2}\/)(\d{4})$/, "$2$1$3")
      ).getTime() -
      new Date(
        nextDay.day.replace(/^(\d{1,2}\/)(\d{1,2}\/)(\d{4})$/, "$2$1$3")
      ).getTime()
    );
  };
  return (
    <div className="formReports">
      <ReservationReportstoExcel dataChart={dataChart} />
      <ComposedChart width={700} height={300} data={dataChart}>
        <XAxis dataKey="day" stroke="#8884d8" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />

        {/* Của user */}
        <Bar dataKey="Đang chờ" fill="#0088FE" barSize={30} />
        <Bar dataKey="Huỷ hẹn" fill="#00C49F" barSize={30} />
        <Bar dataKey="Thành công" fill="#FFBB28" barSize={30} />
        <Bar dataKey="Quá hạn" fill="#FF8042" barSize={30} />
        {/* <Bar dataKey="Tổng cộng" fill="rgb(227, 119, 194)" barSize={30} /> */}
        {/* Dòng tỉ lệ */}
        {/* <Line type="monotone" dataKey="Tổng cộng" stroke="#ff7300" /> */}
      </ComposedChart>
    </div>
  );
}

export default ReservationReports;
