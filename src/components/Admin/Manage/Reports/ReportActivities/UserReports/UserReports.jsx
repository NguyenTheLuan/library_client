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

function UserReports({ usersChart }) {
  const [dataChart, setDataChart] = useState();

  useEffect(() => {
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

      <ComposedChart
        width={800}
        height={300}
        data={dataChart}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="day" scale="band" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Tài khoản mới" barSize={20} fill="#413ea0" />
        <Bar dataKey="Tài khoản bị xoá" barSize={20} fill="#82ca9d" />
        {/* Dòng tỉ lệ */}
        <Line type="monotone" dataKey="Tài khoản mới" stroke="#ff7300" />
      </ComposedChart>
    </div>
  );
}

export default UserReports;
