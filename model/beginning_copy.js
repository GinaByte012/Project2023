const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');
const bcrypt = require('bcrypt');
const { check } = require('diskusage');


// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'view/web/build')));
// app.use(bodyParser.urlencoded({ extended: false }));



module.exports = {
  // =========================================================================
  // <------------------------ Server for Common --------------------------->
  // <--------- Login, Logout, Signup, Find ID&PASSWORD, MAIN PAGE ---------->
  // =========================================================================

  // GET 'login page'
  loginPage: function (req, res) {
    console.log(' ==========================\n req: ', req)
    console.log('[GET] LoginPage for Admin   in beginning.js');
    res.sendFile(path.join(__dirname, '../view/web/build/index.html'));
  },
  // POST 'Login'
  login: function (req, res) {
    console.log('[POST] Login for Admin   in beginning.js');
    const { inputId, inputPasswd } = req.body;
    console.log("id & password from admin: ", id, passwd);

    // Select db query to check requested id & password
    db.query(`SELECT id, passwd FROM admin WHERE id = ? and passwd = ?`,
      [inputId, inputPasswd], function (error, result) {
        console.log('\n\n(in db.query)  [after SELECT] --------  (i got your id and passwd HAHA!)')
        // error 
        if (error) {
          throw error;
        }
        console.log('(in db.query)  [after if] ------> 1. passed 1st error test')

        // Wrong id 
        if (result[0].id === undefined) {
          console.log('(in db.query)  [in 2nd if] ------> 2. you have to sign up!')
          res.end('Who ?');
        }

        // Corect id
        else {
          console.log('(in db.query)  [in else] ------> 3. you are an admin!')

          // compare to password
          // =============수정중
          const checkResult = bcrypt.compare(inputPasswd, result[0].passwd);

          // Wrong Password  ==> Login Fail
          if (!checkResult) {
            console.error('비밀번호 비교 오류:', err);
            res.status(401).json('로그인 실패: 비밀번호가 일치하지 않습니다.');
          }

          // Correct Password  ==> Login Success
          // Save a session
          else {
            console.log('로그인이 성공!')
            // 세션 저장
            req.session.is_logined = true;
            req.session.login_id = result[0].id;
            // 사용자 이름 저장
            const adminData = {
              name: result[0].name
            };
            // JSON 응답을 보냅니다.
            res.json(adminData);
            // 메인 화면으로 redirect
            res.redirect('/main');
            res.end('로그인이 완료되었습니다.');
          }
        }
      })
  },
  // POST Logout
  logout: function (req, res) {
    console.log('[POST] Logout Page for Admin   in beginning.js');
    req.session.destroy(function (err) {
      res.redirect('/');
    })
  },

  // GET Main page
  mainPage: function (req, res) {
    console.log('[GET] MainPage for Admin   in beginning.js');
    res.writeHead(200);
    res.end('Here is the Main Page for Admin');
  },

  // GET find id & pw page
  idPwPage: function (req, res) {
    console.log('[GET] ID & PW Page for Admin   in beginning.js');
    res.writeHead(200);
    res.end('Here is the Find ID & PW Page for Admin');
  },
  // POST find id & pw page
  idPw: function (req, res) {
    console.log('[POST] ID & PW Page for Admin   in beginning.js');
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