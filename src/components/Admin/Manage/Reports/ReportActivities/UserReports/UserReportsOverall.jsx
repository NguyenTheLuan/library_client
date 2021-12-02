import React, { useEffect, useState } from "react";
import { Cell, Pie, PieChart, Sector, Tooltip } from "recharts";

function UserReportsOverall({ usersPie }) {
  const [dataPie, setDataPie] = useState();

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    usersPie && renderObj(usersPie);
  }, [usersPie]);

  // useEffect(() => {
  //   console.log("new nè", dataPie);
  // }, [dataPie]);

  const renderStatus = (status) => {
    if (status === "totalNew") {
      return <>Tổng số lượng tài khoản mới </>
    }
    if (status === "totalDeleted") {
      return <>Tổng số lượng tài khoản đã xoá </>
    }
  }

  const renderObj = (usersPie) => {
    if (!usersPie) {
      return;
    }

    //Lọc keys
    const keys = Object.keys(usersPie);
    const newKeys = keys.filter((key) => {
      if (key !== "new" && key !== "deleted" && key !== "total") {
        return key;
      }
    });

    //Tạo obj mới
    const newObj = [];
    newKeys.map((key) => {
      newObj.push({ name: renderStatus(key).props.children, value: usersPie[key] });
    });

    //Add vô Pie
    setDataPie(newObj);
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
          //   activeShape={renderActiveShape}
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

export default UserReportsOverall;
