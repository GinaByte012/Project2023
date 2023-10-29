import React from "react";
import "./sidebar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import StorageIcon from "@mui/icons-material/Storage";
import PsychologyIcon from "@mui/icons-material/Psychology";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import RecyclingIcon from "@mui/icons-material/Recycling";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import StoreIcon from "@mui/icons-material/Store";
import { Link } from "react-router-dom";

export default function sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <Link to="/">
                <HomeIcon />
                메인 화면
              </Link>
            </li>
            <li className="sidebarListItem">
              <Link to="/users">
                <AccountCircleIcon />
                회원 관리
              </Link>
            </li>
            <li className="sidebarListItem">
              <Link to="/QnA">
                <LiveHelpIcon />
                회원 문의
              </Link>
            </li>
            <li className="sidebarListItem">
              <StorageIcon />
              데이터베이스 관리
            </li>
            <li className="sidebarListItem">
              <Link to="/location">
                <DeleteIcon />
                공공쓰레기통 위치 데이터 관리
              </Link>
            </li>
            <li className="sidebarListItem">
              <Link to="/manual">
                <RecyclingIcon />
                분리배출 매뉴얼 데이터 관리
              </Link>
            </li>
            <li className="sidebarListItem">
              <Link to="/characterlist">
                <EmojiEmotionsIcon />
                캐릭터 데이터 관리
              </Link>
            </li>
            <li className="sidebarListItem">
              <StoreIcon />
              상점 데이터 관리
            </li>
            <li className="sidebarListItem">
              <PsychologyIcon />
              AI 관리
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
