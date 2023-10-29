import React from "react";
import "./character.css";

import { CharacterRows } from "../../dummyData";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "image",
    headerName: "캐릭터 이미지",
    width: 100,
    height: 500,
    renderCell: (params) => <img src={params.value} />,
  },
  {
    field: "background",
    headerName: "캐릭터 배경",
    width: 100,
    height: 500,
    renderCell: (params) => <img src={params.value} />,
  },
  { field: "name", headerName: "캐릭터 이름", width: 130 },
  { field: "growth", headerName: "성장 단계", width: 70 },
];

export default function Home() {
  return (
    <div className="characterList">
      <div className="characterList">
        <div className="characterListContainer">
          <h1 className="characterlistTitle">캐릭터 데이터 관리</h1>
        </div>
      </div>
      <DataGrid
        rows={CharacterRows}
        disableSelectonOnClick
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
