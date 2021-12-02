import React, { useEffect, useState } from "react";
import { Cell, Pie, PieChart, Sector, Tooltip } from "recharts";

function ReservationReportsOverall({ reservationsChart }) {
  const [dataPie, setDataPie] = useState();

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    reservationsChart && renderObj(reservationsChart);
  }, [reservationsChart]);

  // useEffect(() => {
  //   console.log("new nè", dataPie);
  // }, [dataPie]);

  const renderStatus = (status) => {
    if (status === "totalPending") {
      return <>Tổng số lượng lịch hẹn đang chờ </>
    }
    if (status === "totalCanceled") {
      return <>Tổng số lượng lịch hẹn đã huỷ </>
    }
    if (status === "totalOverdue") {
      return <>Tổng số lượng lịch hẹn quá hạn </>
    }
    if (status === "totalFulfilled") {
      return <>Tổng số lượng lịch hẹn thành công </>
    }

  }



  const renderObj = (reservedPie) => {
    // console.log(reservedPie);
    if (!reservedPie) {
      return;
    }

    //Lọc keys
    const keys = Object.keys(reservedPie);
    const newKeys = keys.filter((key) => {
      if (
        key !== "canceled" &&
        key !== "new" &&
        key !== "fulfilled" &&
        key !== "overdue" &&
        key !== "pending" &&
        key !== "total" &&
        key !== "totalNew"

      ) {
        return key;
      }
    });
    // console.log(newKeys);
    //Tạo obj mới
    const newObj = [];

    newKeys.map((key) => {
      newObj.push({
        name: renderStatus(key).props.children, value: reservedPie[key]
      });
    });

    // console.log(newObj);
    //Add vô Pie
    setDataPie(newObj);
  };

  const COLORS = ["#FF8042", "#00C49F", "#FFBB28", "#0088FE"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  return (
    <div className="formReportsOverall">
      <PieChart width={200} height={200}>
        <Pie
          data={dataPie}
          dataKey="value"
          isAnimationActive={false}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          onMouseEnter={onPieEnter}
        >
          {dataPie?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </div>
  );
}

export default ReservationReportsOverall;
