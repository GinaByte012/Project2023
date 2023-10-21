const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

let isVerified = false;

// 홈페이지를 보여주는 라우트
app.get('/signup', (req, res) => {
  res.send(`
    <h1>회원 가입 및 이메일 인증</h1>
    <form method="post" action="/register">
      <label for="name">이름:</label>
      <input type="text" id="name" name="name"><br>

      <label for="username">아이디:</label>
      <input type="text" id="username" name="username"><br>

      <label for="password">비밀번호:</label>
      <input type="password" id="password" name="password"><br>

      <label for="email">이메일:</label>
      <input type="email" id="email" name="email">
      <button type="button" onclick="sendVerificationEmail()">이메일 인증</button>
      <div id="verificationDiv" style="display: none;">
        <input type="text" id="verificationCode" placeholder="인증 코드">
        <button type="button" onclick="verifyCode()">인증 확인</button>
        <div id="timer"></div>
      </div>
      <p id="status"></p>
      <button type="submit">회원 가입</button>
    </form>
    
    <script>
      function sendVerificationEmail() {
        const email = document.getElementById('email').value;
        // 서버로 이메일 보내고, 'verificationDiv'를 표시하도록 요청
        fetch('/send-verification-email?email=' + email)
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              document.getElementById('verificationDiv').style.display = 'block';
              document.getElementById('status').innerText = '이메일이 전송되었습니다. 인증 코드를 입력하세요.';
              const timerElement = document.getElementById('timer');
              let remainingTime = 3 * 60; // 3분
              const timerInterval = setInterval(() => {
                if (remainingTime > 0) {
                  timerElement.innerText = '남은 시간: ' + Math.floor(remainingTime / 60) + '분 ' + (remainingTime % 60) + '초';
                  remainingTime--;
                } else {
                  clearInterval(timerInterval);
                  timerElement.innerText = '인증 코드가 만료되었습니다.';
                  document.getElementById('status').innerText = ' ';
                  document.getElementById('verificationCode').disabled = true;
                  document.getElementById('verifyButton').disabled = true;
                }
              }, 1000);
            } else {
              document.getElementById('status').innerText = '이메일 전송에 실패했습니다.';
            }
          });
      }

      function verifyCode() {
        const code = document.getElementById('verificationCode').value;
        // 서버로 코드 검증 요청
        fetch('/verify-code?code=' + code)
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              document.getElementById('status').innerText = '인증 완료!';
              document.getElementById('emailButton').innerText = '인증 완료';
              document.getElementById('emailButton').disabled = true;
            } else {
              document.getElementById('status').innerText = '인증 실패! 인증코드가 올바르지 않습니다.';
            }
          });
      }      
    </script>
  `);
});


// Nodemailer 설정
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",   // 또는 다른 이메일 제공업체를 사용하려면 해당 정보를 입력하세요.
  port: 2525,
  auth: {
    user: "cc907cc9146809",   // 이메일 계정
    pass: "aaa9334d8260b2"    // 이메일 계정의 비밀번호
  }
});

// 회원 가입 및 이메일 인증 라우트
app.post('/register', (req, res) => {
  const verifyStatus = req.query.verifyStatus;

  if (isVerified) {
    // 본인 인증이 성공한 경우, 회원 가입 페이지 렌더링
    isVerified = false;
    res.send(`
      <>
      <script>
        alert("회원가입이 완료되었습니다.")
        location.href = '/main'
      </script>
      `
    );
  } 
});


// 이메일 인증 이메일 전송 라우트
app.get('/send-verification-email', (req, res) => {
  const email = req.query.email;    // 사용자가 입력한 이메일 주소
  const verificationCode = generateVerificationCode();

  actualCode = verificationCode;

  const mailOptions = {
    from: 'cc907cc9146809',
    to: email,    // 수신자 이메일 주소 (사용자가 입력한 이메일 주소)
    subject: '회원가입을 위한 본인 인증 코드',
    text: `인증 코드: ${verificationCode}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.json({ success: false });
        console.error('이메일 보내기 실패:', error);
    } else {
      res.json({ success: true });
      console.error('이메일 보내기 성공:', info.response);
    }
  });
});

// 인증 코드 검증 라우트
app.get('/verify-code', (req, res) => {
  const code = req.query.code;
  // 실제 생성된 인증 코드와 비교
  if (code === actualCode) {
    isVerified = true;
    res.json({ success: true });
    console.error('인증 성공:', res);
  } else {
    res.json({ success: false });
    console.error('인증 실패:', error);
  }
});

// 서버 시작
const port = 60001;
app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});

// 인증 코드 생성 함수 예시
function generateVerificationCode() {
  return Math.random().toString(36).substring(2, 8); // 무작위 인증 코드 생성 (예: abcd123)
}