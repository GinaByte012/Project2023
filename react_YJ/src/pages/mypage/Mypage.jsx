import React from "react";
import "./mypage.css";

export default function Mypage() {
  return (
    <div className="mypage">
      <div className="mypageTop">
        <h1 className="mypageTitle">관리자 상세페이지</h1>
        <button className="mypagerenameButton">수정하기</button>
      </div>
      <div className="mypageContainer">
        <div className="mypagename">이름 홍길동</div>
        <div className="mypageid">ID admin123</div>
        <span className="mypageemail">
          <label>이메일</label>
          <input
            type="text"
            placeholder="0000@gmail.com"
            className="userUpdatedInput"
          />
        </span>
        <div>
          <span className="mypagepassword">
            <label>비밀번호</label>
            <input
              type="text"
              placeholder="*********"
              className="userUpdatedInput"
            />
          </span>
        </div>
        <span className="mypagepasswordre">
          <label>비밀번호 확인</label>
          <input
            type="text"
            placeholder="*********"
            className="userUpdatedInput"
          />
        </span>
      </div>
    </div>
  );
}
