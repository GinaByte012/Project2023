import React from "react";
import "./user.css";
import { Link } from "react-router-dom";

export default function User() {
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">회원 상세페이지</h1>
        <button className="userdeleteButton">회원탈퇴</button>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <span className="userShowUserNo">회원 No. 00</span>
          </div>
          <span className="userShowUserID">회원 ID abcde</span>
          <div className="userShowBottom">
            <span className="userShowTitle"> 회원 이메일 abcde@gmail.com </span>
          </div>
          <span className="userShowTitle"> 생년월일 000000</span>
        </div>
        <div className="userUpdate">
          <div className="userUpdateTop">
            <span className="userShowUserName">
              <label>회원 이름</label>
              <input
                type="text"
                placeholder="홍길동"
                className="userUpdatedInput"
              />
            </span>
          </div>
          <span className="userShowUserNickName">
            <label>회원 닉네임</label>
            <input
              type="text"
              placeholder="홍길동"
              className="userUpdatedInput"
            />
          </span>
          <div className="userUpdateBottom">
            <span className="userShowUserName">
              <label>분리배출 통계</label>
              <Link to={"/stats/"}>
                <button className="userShowUserrecycle">바로가기</button>
              </Link>
            </span>
          </div>
          <span classNmae="userUpdateTitle">
            <span className="userShowUserName">
              <label>과거 캐릭터 조회</label>
              <button className="userShowUserrecycle">바로가기</button>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
