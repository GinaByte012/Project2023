import React from "react";
import "./featuredInfo.css";

export default function featuredInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">사용자문의</span>
        <div className="featuredQnAContainer">
          <span className="featuredQnA"></span>
        </div>
        <span className="featuredSub">더보기</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">AI 관리</span>
        <div className="featuredQnAContainer">
          <span className="featuredQnA"></span>
        </div>
        <span className="featuredSub">더보기</span>
      </div>
    </div>
  );
}
