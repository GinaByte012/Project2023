import React from "react";
import "./topbar.css";
import { Link } from "react-router-dom";
//import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
//import LogoutIcon from "@mui/icons-material/Logout";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">
            <img alt="10고편한 분리배출" src="로고2.png" />
          </span>
        </div>
        <div className="topRight">
          <Link to={"/mypage"}>
            <button className="modify">내 정보수정</button>
          </Link>
          <Link to={"/login"}>
            <button className="logout">나가기</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
