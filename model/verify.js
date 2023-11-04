const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Nodemailer 설정
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",   // 또는 다른 이메일 제공업체를 사용하려면 해당 정보를 입력하세요.
  port: 2525,
  auth: {
    user: "cc907cc9146809",   // 이메일 계정
    pass: "aaa9334d8260b2"    // 이메일 계정의 비밀번호
  }
});

// 인증 코드 생성 함수
function generateCode() {
  return Math.random().toString(36).substring(2, 8); // 무작위 인증 코드 생성 (예: abcd123)
}

// 인증 이메일 전송 함수
module.exports = {
  Verify: async function (emailAddress) {
    const recipient = emailAddress;   // 이메일 수신자
    const verificationCode = generateCode();    // 전송할 인증 코드 생성

    // 이메일 전송 옵션
    const mailOptions = {
      from: 'cc907cc9146809',
      to: recipient,    // 수신자 이메일 주소 (사용자가 입력한 이메일 주소)
      subject: '회원가입을 위한 본인 인증 코드',
      text: `인증 코드: ${verificationCode}`
    };

    // 이메일 전송
    transporter.sendMail(mailOptions, (error, info) => {
      // 전송 에러
      if (error) {
        console.error('이메일 보내기 실패:', error);
        throw error;
      } else {
        console.error('이메일 보내기 성공:', info.res);
        return verificationCode;
      }
    });
  }
}

// // 인증 코드 검증 함수
// function verifying(inputCode) {
//   return inputCode === verificationCode;
// }


// module.exports = {
//   sendEmail,
//   verifying
// };



