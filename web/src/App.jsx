import React, { useState, useContext } from 'react';
import { Link, Navigate, useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from "./Login";
import Main from "./Main";
import IdPw from "./IdPw";
import Myinfo from "./Myinfo";
import Logout from "./Logout";
import User from "./User";
import QnA from "./QnA";

export const LoginContext = React.createContext(null);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  if (isLoggedIn) {
    return (
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <BrowserRouter>
          {/* 조건문: 로그인O => 보여주기..! 근데, 다른 쪽에서만!!!
          ==> isLoggedIn 변수 : 외부에서도 참조 가능하도록 ==> 아마 props?
        */}
          <div className="onlyForAdmin">
            <p>
              <div className='topbar'>
                <Link to="/main">로고_홈화면</Link><br />
                <Link to="/myinfo">내 정보 수정</Link><br />
                <Link to="/logout">로그아웃</Link><br />
              </div>
              <div className='sidebar'>
                <Link to="/user">회원 관리</Link><br />
                <Link to="/qna">회원 문의 관리</Link><br />
              </div>
            </p>
          </div>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/idPw" element={<IdPw />} />
            <Route path="/main" element={<Main />} />
            <Route path="/myinfo" element={<Myinfo />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/user" element={<User />} />
            <Route path="/qna" element={<QnA />} />
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider >
    );
  }
  else {
    return (
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/idPw" element={<IdPw />} />
            <Route path="/main" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    );
  }
}

export default App;
