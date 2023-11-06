import React from "react";
import Myinfo from "./Myinfo";
import Logout from "./Logout";
import User from "./User";
import QnA from "./QnA";
import { Link, Navigate, useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';



function Main() {
  return (
    <div>
      {/* 홈 */}
      <div className="home">
        <h2>THIS IS Main Page</h2>
      </div>
      {/* <div>
        <div className='topbar'>
          <p>
            <Link to="/main">로고_홈화면</Link><br />
            <Link to="/myinfo">내 정보 수정</Link><br />
            <Link to="/logout">로그아웃</Link>
          </p>
        </div>
        <div className='sidebar'>
          <p>
            <Link to="/user">회원 관리</Link><br />
            <Link to="/qna">회원 문의 관리</Link><br />
          </p>
        </div>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/myinfo" element={<Myinfo />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/user" element={<User />} />
          <Route path="/qna" element={<QnA />} />
        </Routes>
      </div> */}
    </div>
  );
}

export default Main;
