import React from "react";
import "./QnA.css";

import { QnARows } from "../../dummyData";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "no", width: 30 },
  { field: "date", headerName: "문의날짜", width: 100 },
  { field: "name", headerName: "회원이름", width: 130 },
  { field: "title", headerName: "문의 제목", width: 130 },
  { field: "content", headerName: "문의 내용", width: 200 },
];

function QnA() {
  return (
    <div className="qnaList">
      <div className="qnaListContainer">
        <h1 className="qnalistTitle">회원 문의</h1>
      </div>
      <div className="qnaList">
        <DataGrid
          //getRowId={(row) => row.statId}
          rows={QnARows}
          disableSelectonOnClick
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default QnA;