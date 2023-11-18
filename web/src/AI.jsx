import React from "react";
import { useState, useEffect } from "react";
import './AI.css';

import img_labels from './trash_yolov5m_results3/labels.jpg';
import img_results from './trash_yolov5m_results3/results.png';
import img_confusion_matrix from './trash_yolov5m_results3/confusion_matrix.png';
import img_F1_curve from './trash_yolov5m_results3/F1_curve.png';

function AI() {
  const [versionList, setVersionList] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  // const [classificationArray, setClassificationArray] = useState([]);
  // const [currentVersion, setCurrentVersion] = useState('trash_yolov5m_results3');
  // const [lastUpdateDate, setLastUpdateDate] = useState('2023-11-13');

  useEffect(() => {
    fetch(`http://ceprj.gachon.ac.kr:60001/aiManage`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Who': 'Admin'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다');
        }
        return response.json();
      })
      .then(data => {
        console.log("***data: ".data);
        setVersionList(data);
        console.log("***versionList: ".versionList);

      })
      .catch(error => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });
  }, []);

  const handleVersionChange = (event) => {
    setSelectedVersion(event.target.value);
  };

  const applyVersion = () => {
    console.log("Selected Version: ", selectedVersion);
    // 버전 적용 로직 추가
  };

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const uploadFiles = () => {
    console.log("Uploading Files: ", selectedFiles);
    // 여기에 파일을 서버에 업로드하는 로직을 추가하세요.
  };


  return (
    <div>
      {/* <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}> */}
      <div>
        <div>
          <h5>현재 버전: {selectedVersion}</h5>
          <h5>업데이트 날짜: {selectedVersion}</h5>
          <span>버전 선택:</span>
          <select value={selectedVersion} onChange={handleVersionChange}>
            <option value="">선택하세요</option>
            {versionList.map((item, index) => (
              <option key={index} value={item.version}>
                {item.version}
              </option>
            ))}
          </select>
          <button onClick={applyVersion}>적용</button>
        </div>
        <br />
        <div className="AI_Condition_Table">
          <div><h5>성능 지표</h5></div>
          <table>
            <tbody>
              <tr>
                <td className="table_title">
                  <h6>{selectedVersion} - labels</h6>
                </td>
                <td className="table_title">
                  <h6>{selectedVersion} - result</h6>
                </td>
              </tr>
              <tr >
                <td>
                  <img src={img_labels} alt="labels" className="AI_images" />
                </td>
                <td>
                  <img src={img_results} alt="result" className="AI_images" />
                </td>
              </tr>
              <tr>
                <td className="table_title">
                  <h6>{selectedVersion} - confusion_matrix</h6>
                </td>
                <td className="table_title">
                  <h6 >{selectedVersion} - F1_curve</h6>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <img src={img_confusion_matrix} alt="confusion_matrix" className="AI_images" />
                </td>
                <td>
                  <img src={img_F1_curve} alt="F1_curve" className="AI_images" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br /><hr /><br />
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={uploadFiles}>업데이트</button>
      </div>
    </div>
  );
}

export default AI;


// ===================================================================================
// ------------------------- AI Managemeny in Admin Part -----------------------------
// ===================================================================================

// import React from "react";
// import { useState, useEffect } from "react";
// import './AI.css';

// import img_result from './trash_yolov5m_results3/results.png';
// import img_confusion_matrix from './trash_yolov5m_results3/confusion_matrix.png';
// import img_F1_curve from './trash_yolov5m_results3/F1_curve.png';

// function AI() {
//   // const [classificationArray, setClassificationArray] = useState([]);
//   const [currentVersion, setCurrentVersion] = useState('trash_yolov5m_results3');
//   const [lastUpdateDate, setLastUpdateDate] = useState('2023-11-13');


//   useEffect(() => {
//     fetch(`http://ceprj.gachon.ac.kr:60001/aiManage`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Who': 'Admin'
//       }
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('네트워크 응답이 올바르지 않습니다');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setSums(data);


//       })
//       .catch(error => {
//         console.error('데이터를 가져오는 중 오류 발생:', error);
//       });
//   }, []);

//   const rows = Object.entries(sums);

//   const updateHandler = () => {
//     console.log("You press update button!");
//     // const now = new Date();
//     // setLastUpdateDate(now.toLocaleString());
//   }

//   return (
//     <div>
//       {/* <h4 style={{ f/h4> */}
//       <h4 >AI 버전 관리</h4>
//       <br />
//       <h5>현재 버전: {currentVersion}</h5>

//       <div>
//         {/* <h5 style={{ display: 'inline-block', marginRight: '10px' }}>최신 업데이트 날짜: {lastUpdateDate}</h5> */}
//         <h5>최신 업데이트 날짜: {lastUpdateDate}</h5>
//         <button onClick={updateHandler}>업데이트 하기</button>
//       </div>
//       <br />
//       <div><h5>성능 지표</h5></div>
//       <table>
//         <tbody>
//           <tr>
//             <td className="table_title">
//               <h6>{currentVersion} - result</h6>
//             </td>
//             <td className="table_title">
//               <h6>{currentVersion} - confusion_matrix</h6>
//             </td>
//           </tr>
//           <tr >
//             <td>
//               <img src={img_result} alt="result" className="AI_images" />
//             </td>
//             <td>
//               <img src={img_confusion_matrix} alt="confusion_matrix" className="AI_images" />
//             </td>
//           </tr>
//           <tr>
//             <td className="table_title">
//               <h6 className="table_title">{currentVersion} - F1_curve</h6>
//             </td>
//             <td></td>
//           </tr>
//           <tr>
//             <td>
//               <img src={img_F1_curve} alt="F1_curve" className="AI_images" />
//             </td>
//           </tr>
//         </tbody>

//       </table>
//       <br />
//       <br />
//       <div><h4>전체 분리배출 기록</h4></div>
//       <div>
//         <table>

//           <thead>
//             <tr className="table_title">
//               <th>name</th>
//               <th>contents</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map(([name, value]) => (
//               <tr key={name}>
//                 <td>{name}</td>
//                 <td>{value}</td>
//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>
//     </div >
//   )
// }

// export default AI;

