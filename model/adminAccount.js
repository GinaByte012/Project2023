const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');
const bcrypt = require('bcrypt');
const { createSecretKey } = require('crypto');
const verify = require('./verify');
const saltRounds = 10;  // 해싱에 사용. 보안을 높여주기 위해서? 비교를 위해서...


app.use(express.json());
// app.use(express.static(path.join(__dirname, '/../view/web/build', 'utf8')));
app.use(bodyParser.urlencoded({ extended: false }));



module.exports = {
  // GET 'login page' (로그인 화면)
  loginPage: function (req, res) {
    console.log('[GET] LoginPage for Admin   in beginning.js');
    res.sendFile(path.join(__dirname, '/../view/web/build/index.html'));
  },
  // POST 'Login' (로그인 처리)
  login: function (req, res) {
    console.log('[POST] Login for Admin   in beginning.js');
    const { id, passwd } = req.body;
    console.log("id & password from admin: ", id, passwd);
    const inputId = id;
    const inputPasswd = passwd;

    // Select db query to check requested id & password
    db.query(`SELECT id, passwd FROM admin WHERE id = ?`,
      [inputId], function (error, result) {
        console.log('\n\n(in db.query)  [after SELECT] --------  (i got your id and passwd HAHA!)')
        // error 
        if (error) {
          console.error('DB 오류:', error);
          res.status(500).json('Fail: Login  ::  <Server Error> DB');
        }
        console.log('(in db.query)  [after if] ------> 1. passed 1st error test')


        // Wrong id (존재하지 않는 ID)
        if (result[0] === undefined) {
          console.log('(in db.query)  [in 2nd if] ------> 2-1. you have to sign up!')
          res.status(401).json('Fail: Login  ::  Wrong ID');
        }

        // Corect id  (존재하는 ID)
        else {
          console.log('(in db.query)  [in else] ------> 2-2. you are an admin!')

          console.log("result: ", result);
          // Compare to real password
          const checkResult = bcrypt.compare(inputPasswd, result[0].passwd);

          // Wrong Password  ==> Login Fail   (비밀번호 미일치. 로그인 실패)
          if (!checkResult) {
            console.error('비밀번호 비교 오류:', error);
            res.status(401).json('Fail: Login  ::  Wrong Password');
          }

          // Correct Password  ==> Login Success   (비밀번호 일치. 로그인 성공)
          // Save a session
          else {
            console.log('로그인이 성공!')
            // 세션 저장
            req.session.is_logined = true;
            req.session.login_id = result[0].id;
            req.session.is_admin = true;
            // 사용자 이름 저장
            const adminData = {
              name: result[0].name
            };
            // JSON 응답을 보냅니다.
            res.status(200).json("success");
            // res.redirect('/main');


            // 메인 화면으로 redirect
            // ERROR!! ==> res.json 이후 또 res.redirect 불가능! 둘 중 하나만 해야함
            // ===> 서버: 정보 전달, 클라이언트: redirect 하면 문제 없음!
            // res.redirect('/main');
          }
        }
      })
  },
  // POST Logout (로그아웃 요청 처리)
  logout: function (req, res) {
    console.log('[POST] Logout for Admin   in beginning.js');

    console.log("\n\nid from req.body: ", id);
    console.log("req.session.is_logined: ", req.session.is_logined);
    console.log("req.session.login_id: ", req.session.login_id);
    console.log(" req.session.is_admin: ", req.session.is_admin);

    // 로그아웃 요청이 들어오면, 세션 삭제 후 로그인 페이지로 redirect
    req.session.destroy(function (error) {
      console.log("\n\n\n<Trying to destroy the session>")
      if (error) {
        console.log(error);
      }
      else {
        res.status(200).json('Success: Logout');
      }
    })
  },

  // GET Main page (메인 화면)
  mainPage: function (req, res) {
    console.log('[GET] MainPage for Admin   in beginning.js');
    res.status(200).json('Success: Main Page');
    // res.redirect('/main');
  },

  // GET 'Id & Passwd Page'  (아이디/비밀번호 찾기 화면)
  idPwPage: function (req, res) {
    console.log('[GET] idPwPage for Admin   in beginning.js');
    res.status(200).json('Success: Find ID & PASSWORD Page');
  },
  // POST 'Verify Email'  (이메일 인증 요청 처리)
  verify: function (req, res) {
    const inputEmail = req.body;
    // 이메일 인증
    db.query(`SELECT email FROM admin WHERE email = ?`,
      [inputEmail], function (error, result) {
        console.log('\n\n(in db.query)  [after SELECT] --------  (i got your email HAHA!)')
        // error 
        if (error) {
          console.error('DB 오류:', error);
          res.status(500).json('Fail: Sending Verification Email  ::  <Server Error> DB');
        }
        console.log('(in db.query)  [after if] ------> 1. passed 1st error test')

        // DB에서 받아온 정보 출력
        console.log("result: ", result[0]);

        // Wrong information (name/email) (회원정보 일치 실패. 이메일이 일치하는 정보 없음.)
        // 회원가입은 일치 여부 확인 필요 없음!
        if (result[0] === undefined) {
          console.log('(in db.query)  [in 2nd if] ------> 2-1. you have to sign up!')
          res.status(404).json('Fail: Find email  ::  Wrong Email');
        }

        // Correct information (name/email)  (회원정보 일치 성공. 존재하는 이메일)
        else {
          console.log('(in db.query)  [in else] ------> 2-2. I will send you an email.')

          // 이메일 인증 함수 실행 --> 인증 코드 
          const answerCode = verify.sendEmail(result[0].email);

          // 인증 이메일 전송 실패
          if (sending === undefined) {
            console.log("에러 발생!! ");
            res.status(500).json("Fail: Send Verification Email  ::  Somethig wrong.")
          }
          // 인증 이메일 전송 성공
          else {
            console.log("이메일 전송 성공!");
            console.log("Answer Code: ", answerCode);
            res.status(200).json(answerCode);   // 성공 여부와 정답 코드를 클라이언트에게 전달
          }
        }
      })
  },

  // POST 'Find Id'  (아이디 찾기 요청 처리)
  id: function (req, res) {
    console.log('[POST] ID for Admin   in beginning.js');
    // 이름 & 이메일 입력
    const { name, email } = req.body;
    const inputName = name;
    const inputEmail = email;

    db.query(`SELECT name, id, email FROM admin WHERE name = ? AND email = ?`,
      [inputName, inputEmail], function (error, result) {
        console.log('\n\n(in db.query)  [after SELECT] --------  (i got your name & email HAHA!)')
        // error 
        if (error) {
          console.error('DB 오류:', error);
          res.status(500).json('Fail: Find ID  ::  <Server Error> DB');
        }
        console.log('(in db.query)  [after if] ------> 1. passed 1st error test')

        // DB에서 받아온 정보 출력
        console.log("result: ", result[0]);

        // Wrong information (name/email) (회원정보 일치 실패. 이름, 이메일이 일치하는 정보 없음.)
        if (result[0] === undefined) {
          console.log('(in db.query)  [in 2nd if] ------> 2-1. you have to sign up!')
          res.status(404).json('Fail: Find ID  ::  Wrong Information');
        }

        // Correct information (name/email)  (회원정보 일치 성공. 존재하는 이름, 이메일)
        else {
          console.log('(in db.query)  [in else] ------> 2-2. I will send you an email.')

          const yourId = result[0].id;
          res.status(200).json(yourId);
        }
      });
  },

  // POST 'Find Password'   (비밀번호 찾기 요청 처리)
  pw: function (req, res) {
    console.log('[POST] PW for Admin   in beginning.js');

    // 입력된 이름 & 아이디 & 이메일 저장
    const { name, id, email } = req.body;
    const inputName = name;
    const inputId = id;
    const inputEmail = email;

    db.query(`SELECT name, id, passwd, email FROM admin WHERE name = ? AND id = ? AND email = ?`,
      [inputName, inputId, inputEmail], function (error, result) {
        console.log('\n\n(in db.query)  [after SELECT] --------  (i got your name & email HAHA!)')
        // error 
        if (error) {
          console.error('DB 오류:', error);
          res.status(500).json('Fail: Find PASSWD  ::  <Server Error> DB');
        }
        console.log('(in db.query)  [after if] ------> 1. passed 1st error test')

        // DB에서 받아온 정보 출력
        console.log("result: ", result[0]);

        // Wrong information (name/email) (회원정보 일치 실패. 이름, 이메일이 일치하는 정보 없음.)
        if (result[0] === undefined) {
          console.log('(in db.query)  [in 2nd if] ------> 2-1. you have to sign up!')
          res.status(404).json('Fail: Find PASSWD  ::  Wrong Information');
        }

        // Correct information (name/email)  (회원정보 일치 성공. 존재하는 이름, 이메일)
        else {
          console.log('(in db.query)  [in else] ------> 2-2. I will send you an email.')

          // 비밀번호 재설정 화면으로 redirect
          res.redirect('/newPasswdPage');
        }
      });
  },
  // GET 'New Password page'
  newPasswdPage: function (req, res) {
    console.log('[GET] New Password Page for Admin   in beginning.js');
    res.status(200).json('Success: New Password Page');
  },
  // POST 'New Password'
  newPasswd: function (req, res) {
    console.log('[POST] New Password for Admin   in beginning.js');
    const newPw = req.body;
    const adminId = req.session.login_id;
    // <수정>
    // 비밀번호 해싱 
    // 해싱한 비밀번호 DB에 저장
    bcrypt.hash(newPw, saltRounds, (hashErr, hashedPasswd) => {
      if (hashErr) {
        console.error('비밀번호 암호화 중 오류 발생: ', hashErr);
        return res.status(500).json({ error: 'fail: hashing error' });
      }

      db.query(`UPDATE admin SET paswd = ? WHERE id = ?`,
        [hashedPasswd, adminId], function (error, result) {
          console.log('\n\n(in db.query)  [after SELECT] --------  (i got your name & email HAHA!)')
          // error 
          if (error) {
            console.error('DB 오류:', error);
            res.status(500).json('Fail: Create New PASSWORD  ::  <Server Error> DB - while update');
          }
          // 재설정 성공! 
          else {
            console.log('(in db.query)  [in else] ------> 2-2. I will send you an email.')

            // 로그인 화면으로 redirect
            res.redirect('/');
          }
        });
    })
  }
}





// //   // --------------- START ADMIN API DEFINITION ----------------------
// //   // 브라우저(리액트)가 서버에게 접속하면 보내는 첫 폐이지(즉, 빌드한 페이지)
// //   mainPage: (req, res) => {
// //     console.log('Home [GET] for Admin   in myserver.js')
// //     // res.send("I'm a const loginPage! Hi, React. Reply for you!");
// //     res.sendFile(path.join(__dirname, 'view/web_admin/build/index.html'));

// //   },

// //   // 로그인 페이지. 세션 확인 후, 로그인이 되어있지 않은 상태면 여기로 온다.
// //   loginPage: (req, res) => {
// //     console.log('Login [GET] for Admin   in myserver.js')
// //     res.sendFile(path.join(__dirname, 'view/web_admin/build/login.html'));

// //     db.query(`SELECT id, passwd FROM admin WHERE id = ? and passwd = ?`,
// //       [id, passwd], function (error, result) {
// //         console.log('\n\n(in db.query)  [after SELECT] --------  (i got your id and passwd HAHA!)')
// //         // error 
// //         if (error) {
// //           throw error;
// //         }
// //         console.log('(in db.query)  [after if] ------> 1. passed 1st error test')

// //         // Wrong id 
// //         if (result[0] === undefined) {
// //           console.log('(in db.query)  [in 2nd if] ------> 2. you have to sign up!')
// //           res.end('Who ?');
// //         }

// //         // Corect id
// //         else {
// //           console.log('(in db.query)  [in else] ------> 3. you are an admin!')

// //           // compare to password

// //           // Wrong password
// //           if () {

// //           }

// //           // Correct Password
// //           else {
// //             req.session.is_logined = true;
// //             req.session.login_id = result[0].login_id;
// //             res.redirect('/main');
// //             res.end('Welcome !!!');
// //           }
// //         }
// //         console.log('(in db.query)  [after else] ------> 4. this is the last part in db in login process! BYE!!')
// //       })
// //     // res.send("I'm a const loginPage! Hi, React. Reply for you!");
// //   },
// //   // 로그인 POST. 아이디와 비밀번호를 받아 회원인지 확인한다.
// //   login: (req, res) => {
// //     console.log('Logout [POST] for Admin   in myserver.js')
// //     // res.send("I'm a const login! Hi, React. Reply for you!");
// //     const { id, passwd, isLogined } = req.body;
// //     console.log("[ --- after req.body --- ]  id : ", id)
// //     console.log("[ --- after req.body --- ]  passwd : ", passwd)
// //     console.log("[ --- after req.body --- ]  isLogined : ", isLogined)

// //     db.query(`SELECT id, passwd FROM admin WHERE id = ? and passwd = ?`,
// //       [id, passwd], function (error, result) {
// //         console.log('(in db.query)  [after SELECT] --------')
// //         if (error) {
// //           throw error;
// //         }
// //         console.log('(in db.query)  [after if] ------> 1. passed 1st error test')

// //         if (result[0] === undefined) {
// //           console.log('(in db.query)  [in 2nd if] ------> 2. you are not an admin!')
// //           res.end('Who ?');
// //         }
// //         else {
// //           console.log('(in db.query)  [in else] ------> 3. you are an admin!')
// //           req.session.is_logined = true;
// //           req.session.login_id = result[0].login_id;
// //           res.redirect('/');
// //           res.end('Welcome !!!');
// //         }
// //         console.log('(in db.query)  [after else] ------> 4. this is the last part in db in login process! BYE!!')
// //       })
// //     console.log('(after db.query)  [after else] ------> 5. you did well in db in login process!! Good job!!')
// //     res.send("I'm a const login! Hi, React. Reply for you!");

// //   }
// // }