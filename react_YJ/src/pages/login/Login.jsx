import React from "react";
const serverURL = "http://ceprj.gachon.ac.kr:60001/admin/login_process";

function Login() {
  // const [userData, setUserData] = useState(null);
  const onLogin = (event) => {
    console.log("로그인 버튼 눌림");
    event.preventDefault();
    const id = event.target.id.value;
    const passwd = event.target.passwd.value;
    console.log("post 전송");
    console.log("id: ", id);
    console.log("passwd: ", passwd);
    fetch(serverURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, passwd }),
    }).then((res) => {
      console.log(res);
    });
  };

  const onSearchIdPw = () => {
    console.log("아이디/비밀번호 찾기 버튼 눌림");
    fetch("/searchIdPw").then((res) => console.log(res));
  };

  return (
    <div>
      <h2>관리자 로그인 페이지</h2>

      <form onSubmit={onLogin}>
        <label>ID : </label>
        <input type="text" name="id" />
        <br />
        <label>PW : </label>
        <input type="password" name="passwd" />
        <br />
        <button type="submit">로그인</button>
      </form>

      <div>
        <button type="button" onClick={onSearchIdPw}>
          아이디/비밀번호 찾기
        </button>
      </div>
    </div>
  );
}

export default Login;
