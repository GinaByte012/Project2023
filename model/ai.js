const db = require('./db');
const AiClassification = require('/home/t23201/svr/v0.9/src/model/AiClassification.js');
const verifyToken = require('../lib/verifyToken');
const multer = require('multer');
const express = require('express');
const { createPool } = require('mysql');
const fs = require('fs').promises;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();
app.use(express.json());

module.exports = {
  aiControl: async function (req, res) {
    // 사용자 정보 초기화
    var userId = null;
    var userNum = null;

    // 토큰 검증 미들웨어를 통해 사용자 정보를 가져옵니다
    verifyToken(req, res, upload.single('inputImage'), async () => {
      userId = req.user.id;
      try {
        // 사용자 번호 조회
        const [rows] = await db.query('SELECT user_num FROM user WHERE id = ?', [userId]);
        userNum = rows[0].user_num;
      } catch (error) {
        console.log("Error: during db processing (in ai.js)", error);
        res.status(500).json({ error: 'Fail: DB ERROR' });
      }
    });

    // 클라이언트에서 전송한 이미지 데이터
    const inputImageBuffer = req.file.buffer;
    console.log("userId from server (in ai.js): ", req.user.id);
    console.log("inputImage from server (in ai.js): ", inputImageBuffer);

    try {
      // AI detect
      const result = await AiClassification.AiClassification(inputImageBuffer);
      console.log('--result:', result);
      console.log('--result.savedImagePath: ', result.savedImagePath);

      // 이미지 파일을 읽어와 바이너리 형태로 클라이언트로 전송
      const resultImagePath = result.savedImagePath;
      const resultImageBuffer = await fs.readFile(resultImagePath);

      // DB에서 class_num 조회
      db.query(`SELECT class_num FROM classification WHERE classified = ?`, [resultImageBuffer], function (error, result) {
        if (error) {
          console.log("Error: during db processing (in ai.js)", error);
          res.status(500).json({ error: 'Fail: DB ERROR' });
        } else {
          const classNum = result[0].class_num;
          // 클라이언트로 이미지 바이너리 데이터와 class_num 함께 전송
          const resultImageBase64 = resultImageBuffer.toString('base64');
          res.json({ classNum: classNum, resultImage: resultImageBase64 });
        }
      });
    } catch (error) {
      console.error('Error processing image:', error);
      res.status(500).json({ error: 'Failed to process image' });
    }
  }
}

// module.exports = {
//   // !! POST ??  (이미지 파일 받아옴.) !!
//   aiControl: async function (req, res) {
//     console.log("This is an Ai Control   (in ai.js)");
//     var userId = null;
//     var userNum = null;
//     // !! 토큰 검증 미들웨어를 통해 사용자 정보를 가져옵니다 !!
//     verifyToken(req, res, upload.single('inputImage'), async () => {
//       userId = req.user.id;
//     });
//     db.query(`select user_num from user where id = ? `, [userId],(error, rows)=>{
//       if (error) {
//         console.log("Error: during db proccessing (in ai.js)", error);
//         res.status(500).json({ error: 'Fail: DB ERROR' });
//       }
//       userNum = rows[0].user_num;
//     })
//     // !! 사용자 정보 저장을 위한 토큰 정보 !!
//     // const userId = req.user.id;
//     const inputImage = req.body.file;
//     console.log("userId from server (in ai.js): ", req.user.id);
//     console.log("inputImage from server (in ai.js): ", inputImage);
//     try {
//       // !! AI detect !!
//       // !! AI로부터 받은 결과 변수에 저장 (이미지 & 텍스트) !!
//       // const result = await AiClassification('path/to/image.jpg');
//       const result = await AiClassification.AiClassification(inputImage);
//       console.log('--result:', result);
//       console.log('--result.savedImagePath: ', result.savedImagePath);

//       // !! input, output 이미지 db에 저장 !! 
//       // !! output 결과 서버에 전달 (이미지 & 텍스트) !!

//       //DB에 이미지를 저장하기 위해 이미지파일을 blob 형태로 변환
//       // const inputImageBuffer = inputImage.buffer;
//       const inputImageBuffer = await fs.readFile(`./model/inputs/${inputImage}`);
//       console.log("after inputImageBuffer------");
//       const inputImageBlob = inputImageBuffer.toString('base64');
//       const resultImagePath = result.savedImagePath;
//       const resultImageBuffer = await fs.readFile(resultImagePath);
//       const resultImageBlob = resultImageBuffer.toString('base64');
//       // !! DB에 정보를 저장할 때, 결과로 나온 쓰레기들만 개수를 카운트해서 추가. !! 
//       // !! 결과가 숫자면, dictionary를 사용해서 1~21까지 각각에 대해 DB 명을 지정 (...?) !!
//       // !! loop 돌리면서 결과에 있는 숫자들의 개수만큼 +1   (...?)   (아마 배열에 담아서?) !!
//       // !! 저장된 배열 전체를 다시 일대일 mapping(?)해서 db에 저장..?

//       // db.query(`INSERT INTO classification (user_num, date, img_bf, classified, types_count, Cardboard, Paperboard, Booklets, Carton, Paper_Etc, Plastic_Container, Clear_PET, Colored_PET, Packaging_Plastic, Plastic_Etc, Vinyl, ) VALUES (?, ?, ?, ?, ?)`,

//       db.query(`INSERT INTO classification SET user_num = ?, img_bf = ?, classified = ?`, [userNum, inputImageBlob, resultImageBlob], function (error, result) {
//         if (error) {
//           console.log("Error: during db proccessing (in ai.js)", error);
//           res.status(500).json({ error: 'Fail: DB ERROR' });
//         } else {
//           console.log('Inserted into the database!');
//           db.query(`SELECT class_num from classification WHERE classified = ?`, [resultImageBlob], function(error, result){
//             if (error) {
//               console.log("Error: during db proccessing (in ai.js)", error);
//               res.status(500).json({ error: 'Fail: DB ERROR' });
//             }else{
//               const classNum = result[0].class_num;
//               res.json(classNum);
//             }
//           })
//         }
//       });
//     } catch (error) {
//       console.error('Error processing image:', error);
//       res.status(500).json({ error: 'Failed to process image' });
//     }
//   }
// }