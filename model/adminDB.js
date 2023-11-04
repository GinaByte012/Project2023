const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');
const bcrypt = require('bcrypt');
const { createSecretKey } = require('crypto');
// const verify = require('verify');


app.use(express.json());
// app.use(express.static(path.join(__dirname, '/../view/web/build', 'utf8')));
app.use(bodyParser.urlencoded({ extended: false }));


module.exports = {
  // =======================================================================
  // <------------------------- 관리자 내 정보 수정 --------------------------->
  // =======================================================================
  myinfoPage: function (req, res) {
    console.log("[GET]  Admin's my Information Page  in AdminDB.js");

  },
  passwdAuthPage: function (req, res) {
    console.log("[GET]  Admin's Check Current Password Page  in AdminDB.js");
  },
  passwdAuth: function (req, res) {
    console.log("[GET]  Admin's Check Current Password  in AdminDB.js");
  },
  myinfo: function (req, res) {
    console.log("[GET]  Admin's Update my Information Page  in AdminDB.js");
  },
  myinfoUpdate: function (req, res) {
    console.log("[PUT]  Admin's PUT my Information  in AdminDB.js");
  },

  // =======================================================================
  // <---------------------------- 사용자 관리 ----------------------------->
  // =======================================================================
  // GET 'User List'   (사용자 리스트 화면)
  userList: function (req, res) {
    console.log('[GET] UserList for Admin   in beginning.js');
    db.query(`SELECT user_num, name, nickname, id, birth, email, bottlecap, point FROM user`, function (error, result) {
      // error 발생
      if (error) {
        console.log('DB 오류: '.error);
        res.status(500).json('Fail: GET USER LIST  ::  DB');
      }

      // DB에 저장된 정보가 없음
      if (result.length === 0) {
        console.log("i got no information from user table");
        res.status(404).json("I got nothing from user table");
      }
      else {
        console.log(result);
        res.send(result);
      }
    })
  },
  // GET 'User Detail'  (사용자 개인 화면)
  userDetail: function (req, res) {
    console.log('[GET] UserDetail for Admin   in beginning.js');
    var userNum = req.params.userNum;
    db.query(`SELECT user_num, name, nickname, id, birth, email, bottlecap, point FROM user WHERE user_num = ?`,
      [userNum], function (error, result) {
        // error 발생
        if (error) {
          console.log('DB 오류: '.error);
          res.status(500).json('Fail: GET USER LIST  ::  DB');
        }

        // DB로부터 저장된 정보가 없음
        if (result[0] === undefined) {
          console.log("i got no information from user table");
          res.status(404).json("I got nothing from user table");
        }
        // DB로부터 정보 잘 저장됨
        else {
          console.log(result[0]);
          res.send(result[0]);
        }
      })
  },
  // POST 'User Create'    // (사용자 정보 등록)
  userCreate: function (req, res) {
    console.log('[POST] UserDetail for Admin   in beginning.js');
    // ?? 과연 필요할까욤..?
  },
  // Get 'User Update Page'   // (사용자 정보 수정)
  userUpdatePage: function (req, res) {
    console.log('[PUT] UserDetail for Admin   in beginning.js');

  },
  // PUT 'User Update'   // (사용자 정보 수정)
  userUpdate: function (req, res) {
    console.log('[PUT] UserDetail for Admin   in beginning.js');

  },
  // DELETE 'User Delete'    // (사용자 정보 삭제)
  userDelete: function (req, res) {
    console.log('[DELETE] UserDetail for Admin   in beginning.js');

  },
  // GET 'User's Trash History'   (사용자 분리배출 기록)
  userTrash: function (req, res) {

  },
  // GET 'User's Pet History'     (사용자 캐릭터 키운 기록)
  userPet: function (req, res) {

  },


  // =======================================================================
  // <------------------------- 사용자 문의 관리 --------------------------->
  // =======================================================================


  // =======================================================================
  // <---------------------- 분리배출 데이터 관리 --------------------------->
  // =======================================================================


  // =======================================================================
  // <--------------------- 쓰레기통 위치 데이터 관리 ----------------------->
  // =======================================================================


  // =======================================================================
  // <------------------------ 캐릭터 데이터 관리 -------------------------->
  // =======================================================================


  // =======================================================================
  // <------------------- SUPER Admin - 관리자들 관리 ---------------------->
  // =======================================================================
  // GET 'Admin List'  (권한O - 관리자들 목록 화면)
  adminsPage: function (req, res) {
    console.log('[GET] Admins Page for Super Admin   in beginning.js');
    // 수정수정중
    db.query(`SELECT admin_num , name, id, passwd, birth, email, department, isAuth FROM admin`,
      function (error, result) {
        console.log('\n\n(in db.query)  [after SELECT] --------  (i got your id and passwd HAHA!)')
        // error 
        if (error) {
          console.error('DB 오류:', error);
          res.status(500).json('Fail: Login  ::  <Server Error> DB');
        }
        console.log('(in db.query)  [after if] ------> 1. passed 1st error test')

        // DB에서 받아온 정보 출력
        console.log("result.length: ", result.length);
        console.log("result: ", result[0]);

        // Couldn't find data (불러온 데이터가 없음)
        if (result.length === 0) {
          console.log('(in db.query)  [in 2nd if] ------> 2-1. you have to sign up!')
          res.status(401).json("Fail: Login  ::  Couldn't find any data");
        }

        // Corect id  (존재하는 ID)
        else {
          console.log('(in db.query)  [in else] ------> 2-2. you are an admin!')

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
            // 사용자 이름 저장
            const adminData = {
              name: result[0].name
            };
            // JSON 응답을 보냅니다.
            res.status(200).json(adminData);

            // 메인 화면으로 redirect
            // ERROR!! ==> res.json 이후 또 res.redirect 불가능! 둘 중 하나만 해야함
            // ===> 서버: 정보 전달, 클라이언트: redirect 하면 문제 없음!
            // res.redirect('/main');
          }
        }
      })
  },

  // GET 'New Admin'   (권한O - 새 관리자 등록 화면)
  newAdmin: function (req, res) {
    console.log('[GET] New Admin Page for Super Admin   in beginning.js');

  },

  // POST 'Admin's Detail    (권한O - 새 관리자 등록)
  newAdmin: function (req, res) {
    console.log('[POST] New Admin for Super Admin   in beginning.js');

  },

  // GET "Admin's Detail"     (권한O - 관리자 정보 화면)
  adminDetailUpdate: function (req, res) {
    console.log('[Get] Admin Detail Page for Super Admin   in beginning.js');

  },

  // PUT 'Admin's Detail    (권한O - 관리자 정보 수정)
  adminDetailUpdate: function (req, res) {
    console.log('[PUT] Admin Detail Update for Super Admin   in beginning.js');

  },

  // DELETE 'Admin's Detail   (권한O -관리자 정보 삭제)
  adminDetailDelete: function (req, res) {
    console.log('[DELETE] Admin Detail Delete for Super Admin   in beginning.js');

  }

}