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
import BooksReportstoExcel from "./BooksReportstoExcel";

function BookReports({ booksChart }) {
  const [dataChart, setDataChart] = useState();

  useEffect(() => {
    booksChart && renderObj(booksChart.new);
  }, [booksChart]);

  // useEffect(() => {
  //   console.log("dataChart", dataChart);
  // }, [dataChart]);

  const renderObj = (books) => {
    if (!books) {
      return;
    }
    const nameObj = Object.keys(books);
    const valueObj = Object.values(books);
    const result = nameObj.map((val, index) => {
      return { name: val, "Số lượng sách mới": valueObj[index] };
    });
    // console.log(dataChart);
    setDataChart(result);
  };

  return (
    <div className="formReports">
      <BooksReportstoExcel dataChart={dataChart} />
      <ComposedChart cộng width={700} height={300} data={dataChart}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />

        {/* Của user */}
        <Bar dataKey="Số lượng sách mới" fill="#8884d8" barSize={30} />
        {/* Dòng tỉ lệ */}
        {/* <Line type="monotone" dataKey="Số lượng sách mới" stroke="#ff7300" /> */}
      </ComposedChart>
    </div>
  );
}

export default BookReports;
