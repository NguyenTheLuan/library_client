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
  // console.log("booksChart nè", booksChart);
  const [dataChart, setDataChart] = useState();

  useEffect(() => {
    booksChart && renderObj(booksChart);
  }, [booksChart]);

  // useEffect(() => {
  //   console.log("dataChart", dataChart);
  // }, [dataChart]);

  const renderObj = (booksChart) => {
    // console.log("của biểu đồ", booksChart);
    const { deleted, new: SachMoi } = booksChart;
    // console.log("new đã lấy", SachMoi);
    if (!deleted || !SachMoi) {
      return;
    }
    const keyDeleted = Object.keys(deleted);
    const keySachMoi = Object.keys(SachMoi);

    const set = new Set([...keyDeleted, ...keySachMoi]);

    const newObj = [];
    for (var date of set) {
      newObj.push({
        day: date,
        "Số lượng sách mới": SachMoi[date] ? SachMoi[date] : 0,
        "Số lượng sách bị xoá": deleted[date] ? deleted[date] : 0,
      });
    }
    // console.log("new Obj nè", newObj);
    newObj.sort(day_sort);
    // console.log("sau khi sắp xếp của biểu đồ", newObj);
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
      <BooksReportstoExcel dataChart={dataChart} />
      <ComposedChart cộng width={700} height={300} data={dataChart}>
        <XAxis dataKey="day" stroke="#8884d8" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />

        {/* Của user */}
        <Bar dataKey="Số lượng sách mới" fill="#0088FE" barSize={30} />
        <Bar dataKey="Số lượng sách bị xoá" fill="#00C49F" barSize={30} />
        {/* Dòng tỉ lệ */}
        {/* <Line type="monotone" dataKey="Số lượng sách mới" stroke="#ff7300" /> */}
      </ComposedChart>
    </div>
  );
}

export default BookReports;
