import React, { useRef, useState } from "react";
import axios from "axios";
import QrReader from "react-qr-reader";
import { useLocation } from "react-router";

const QRScanner = () => {
  const { state } = useLocation();
  const [scanResultFile, setScanResultFile] = useState(null);
  const [lecid, setLecid] = useState(null);
  const [list, setList] = useState([`${state[0]._id}`]);
  const qrRef = useRef(null);

  const handleErrorFile = (error) => {
    console.log(error);
  };

  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  };
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };

  const lecture = `
  query($id: ID!){
    findLectureByID(id: $id){
      id
      attendance{
        _id
        name
        rollNo
      }
    }
  }
  `;
  const updateLecture = `
  mutation($id: ID!,$lectureid: String!,$atten: [ID!]){
    updateLecture(id: $id, data: {attendance: $atten,id: $lectureid}){
      attendance{
        rollNo
        name
        isStudent
      }
    }
  }
  `;

  const fetchData = async () => {
    const { data } = await axios({
      url: "https://graphql.fauna.com/graphql",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_FAUNA}`,
      },
      data: {
        query: lecture,
        variables: {
          id: scanResultFile,
        },
      },
    });
    setLecid(data.data.findLectureByID.id);
    console.log(data.data.findLectureByID.attendance.map((l) => l._id));
    setList([
      ...list,
      ...data.data.findLectureByID.attendance.map((l) => l._id),
    ]);
  };

  const putData = async () => {
    const { data } = await axios({
      url: "https://graphql.fauna.com/graphql",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_FAUNA}`,
      },
      data: {
        query: updateLecture,
        variables: {
          id: scanResultFile,
          lectureid: lecid,
          atten: list,
        },
      },
    });
    if(data){
      alert('Attendance Marked!');
    }
  };

  console.log(list);
  console.log(lecid);

  return (
    <div>
      <div style={{ margin: 'auto' }}>
        <QrReader
          ref={qrRef}
          delay={500}
          style={{ width: "500px", height: "300" }}
          onError={handleErrorFile}
          onScan={handleScanFile}
          legacyMode
        />
      </div>
      <div style={{margin: "2% auto"}}>
      <button onClick={onScanFile}>Scan QR-Code</button>
      <button onClick={fetchData}>Upload</button>
      <button onClick={putData}>Send</button>
      </div>
    </div>
  );
};

export default QRScanner;
