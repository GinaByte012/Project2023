import React from "react";
import "./TrashResult.css";

import { statRows } from "../../dummyData";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "image", headerName: "이미지", width: 100 },
  { field: "date", headerName: "날짜", width: 130 },
  { field: "content", headerName: "분리배출 품목", width: 130 },
  { field: "number", headerName: "개수", width: 100 },
  { field: "feedBack", headerName: "피드백 여부", width: 100 },
  { field: "feedBackn", headerName: "피드백 내용", width: 150 },
];

export default function TrashResult() {
  return (
    <div TrashResult>
      <div className="statListContainer">
          <h1 className="statlistTitle">분리배출 히스토리</h1>
      </div><DataGrid
              rows={statRows}
              disableSelectonOnClick
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5]}
              checkboxSelection />
              </div>
  );
}
