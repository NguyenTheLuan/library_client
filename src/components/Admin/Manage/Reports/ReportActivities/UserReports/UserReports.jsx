import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

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

      setDataChart(newObj);
    }
  };

  return (
    <div>
      <BarChart width={900} height={300} data={dataChart}>
        <XAxis dataKey="day" stroke="#8884d8" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />

        {/* Của user */}
        <Bar dataKey="Tài khoản mới" fill="#8884d8" barSize={30} />
        <Bar dataKey="Tài khoản bị xoá" fill="#82ca9d" barSize={30} />
      </BarChart>

      <span>Thống kê số lượng người dùng</span>
    </div>
  );
}

export default UserReports;
