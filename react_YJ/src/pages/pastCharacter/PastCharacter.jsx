import React from "react";
import "./pastCharacter.css";

import { pcharacterRows } from "../../dummyData";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "type", headerName: "캐릭터 종류", width: 100 },
  { field: "date", headerName: "방생 날짜", width: 200 },
  { field: "name", headerName: "이름", width: 200 },
];

export default function PastCharacter() {
  <div className="PastCharacter">
    <div className="PastCharacter">과거 캐릭터 조회</div>;
    <DataGrid
      rows={pcharacterRows}
      disableSelectonOnClick
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[5]}
      checkboxSelection
    />
    ;
  </div>;
}
