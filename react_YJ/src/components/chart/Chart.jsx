import React from "react";
import "./chart.css";
import { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Chart() {
  const data = [
    {
      name: "종이",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "스티로폼",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "캔",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "페트",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "일반쓰레기",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "유리",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "비닐",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className="chart">
      <div className="chartone">
        <span className="charttitle">전체 사용자 분리배출 통계</span>
        <ResponsiveContainer width="100%" height="300px">
          <BarChart width={150} height={40} data={data}>
            <Bar dataKey="uv" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        <span className="chartSub">더보기</span>
      </div>

      <div className="chartone">
        <span className="charttitle">공공 쓰레기통 위치 데이터 관리</span>
        <span className="featuredSub">더보기</span>
      </div>
    </div>
  );
}
