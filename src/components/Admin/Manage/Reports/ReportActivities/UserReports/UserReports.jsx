import React, { useEffect, useState } from "react";
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function UserReports({ usersChart }) {
  document.title = "Thống kê hoạt động";

  const [dataChart, setDataChart] = useState();

  useEffect(() => {
    // console.log("user charts", usersChart);
    usersChart && renderObj(usersChart);
  }, [usersChart]);

  // useEffect(() => {
  //   console.log(dataChart);
  // }, [dataChart]);

  const renderObj = (usersChart) => {
    //Nếu không có thì bỏ qua

    const { deleted, new: NguoiDungMoi } = usersChart;

    if (!deleted || !NguoiDungMoi) {
      return;
    }

    const keyDeleted = Object.keys(deleted);
    const keyNguoiDungMoi = Object.keys(NguoiDungMoi);

    const set = new Set([...keyDeleted, ...keyNguoiDungMoi]);

    const newObj = [];
    for (var date of set) {
      newObj.push({
        day: date,
        "Tài khoản mới": deleted[date] ? deleted[date] : 0,
        "Tài khoản bị xoá": NguoiDungMoi[date] ? NguoiDungMoi[date] : 0,
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
    <div>
      <h2>Thống kê số lượng người dùng</h2>
      <BarChart width={900} height={300} data={dataChart}>
        <XAxis dataKey="day" stroke="#8884d8" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />

        {/* Của user */}
        <Bar dataKey="Tài khoản mới" fill="#8884d8" barSize={30} />
        <Bar dataKey="Tài khoản bị xoá" fill="#82ca9d" barSize={30} />
        <Line type="monotone" dataKey="Tài khoản mới" stroke="#ff7300" />
      </BarChart>
    </div>
  );
}

export default UserReports;
