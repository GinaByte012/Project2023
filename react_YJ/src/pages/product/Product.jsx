import React from "react";
import "./product.css";

export default function Product() {
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">분리배출 매뉴얼 상세페이지</h1>
        <button className="productcorrectionButton">수정</button>
        <button className="productdeleteButton">삭제</button>
      </div>
      <div className="productContainer">
        <div className="productShow">
          <div className="productShowTop">
            <span className="productShowUserNo">분리배출 No. 01</span>
          </div>
          <span className="productShowUserID">분리배출 카테고리 플라스틱</span>
        </div>
        <div className="productUpdate">
          <div className="productUpdateTop">
            <span className="productUpdatehowto">분리배출 방법</span>
          </div>
        </div>
      </div>
    </div>
  );
}
