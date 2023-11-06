import React from "react";
import "./manual.css";

import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { manualRows } from "../../dummyData";
// import { Link } from "react-router-dom";
import { useState } from "react";

export default function Manual() {
  const [data, setData] = useState(manualRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "product",
      headerName: "카테고리",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "content", headerName: "내용", width: 400 },
    {
      field: "action",
      headerName: "수정",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <a href={`/product/${params.row.id}`} className="productListEdit">
              <button className="productListEdit">정보수정</button>
            </a>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="manualList">
      <div className="manuallist">
        <div className="ManualContainer">
          <h1 className="manualTitle">분리배출 매뉴얼 관리</h1>
        </div>
      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
