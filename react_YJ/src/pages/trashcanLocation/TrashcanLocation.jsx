import React from "react";
import { Link } from "react-router-dom";
import "./trashcanLocation.css";

import { locationRows } from "../../dummyData";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "No", width: 70 },
  { field: "gu", headerName: "자치구명", width: 130 },
  { field: "location", headerName: "위치", width: 130 },
  { field: "location_2", headerName: "상세 위치", width: 130 },
  { field: "wlwja", headerName: "설치 지점", width: 100 },
  {
    field: "action",
    headerName: "상세페이지",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <Link to={"/location/" + params.row.id}>
            <button className="userListEdit">상세페이지</button>
          </Link>
        </>
      );
    },
  },
];

export default function TrashcanLocation() {
  return (
    <div className="locationList">
      <div className="locationListContainer">
        <h1 className="locationlistTitle">상세페이지</h1>
      </div>
      <div>
        <DataGrid
          rows={locationRows}
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
