import React from "react";
// import { Link } from "react-router-dom";
import "./userList.css";

import { userRows } from "../../dummyData";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "no", headerName: "No", width: 70 },
  { field: "name", headerName: "이름", width: 130 },
  { field: "id", headerName: "아이디", width: 130 },
  {
    field: "action",
    headerName: "상세페이지",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <a href={`/user/${params.row.id}`} className="userListDetail">
              <button className="userListDetail">상세페이지</button>
          </a>
        </>
      );
    },
  },
];

export default function UserList() {
  return (
    <div className="userList">
      <div className="userList">
        <div className="userListContainer">
          <h1 className="userlistTitle">회원 관리</h1>
        </div>
      </div>
      <DataGrid
        rows={userRows}
        disableSelectonOnClick
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
