import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

function UserReports({ usersChart }) {
  const [dataChart, setDataChart] = useState();

  useEffect(() => {
    console.log("user charts", usersChart);
    usersChart && renderObj(usersChart.new);
  }, [usersChart]);

  const renderObj = (arrObj) => {
    //Nếu không có thì bỏ qua
    if (!arrObj) {
      return;
    }
    const nameObj = Object.keys(arrObj);
    const valueObj = Object.values(arrObj);
    // console.log(valueObj);

    const result = nameObj.map((val, index) => {
      return { name: val, "Tài khoản mới": valueObj[index] };
    });
    // console.log(dataChart);
    setDataChart(result);
  };

  return (
    <div>
      <BarChart width={900} height={300} data={dataChart}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />

        {/* Của user */}
        <Bar dataKey="Tài khoản mới" fill="#8884d8" barSize={30} />
      </BarChart>

      <span>Thống kê số lượng người dùng</span>
    </div>
  );
}

export default UserReports;
